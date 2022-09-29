pipeline {
  agent any

  options {
    buildDiscarder(logRotator(artifactNumToKeepStr: '10'))
  }

  stages {
    stage('build') {
      steps {
        sh "npm prune --ignore-scripts"
        sh "rm -rf node_modules"
        sh "npm install --ignore-scripts"
        sh "npm run build"
        sh "rm -f wwdb.zip"
        sh "zip -r wwdb.zip dist/index.html dist/scouts-wwdb.js dist/scouts-wwdb.js.map dist/favicon.ico"
      }
    }

    stage('archive') {
      when {
        anyOf {
          branch "production"
          branch "staging"
        }
      }
      steps {
        rtUpload (
          serverId: 'artifactory',
          spec: '''{
            "files": [
              {
                "pattern": "wwdb.zip",
                "target": "wwdb-frontend/${BRANCH_NAME}/${BUILD_ID}/"
              }
           ]
          }'''
        )
      }
    }

    stage('deploy') {
      steps {
        sh 'ssh az-deb-mgmt sudo -u ansible /opt/deploy-wwdb.sh frontend ${BRANCH_NAME}'
      }
    }
  }

  post {
    failure {
      emailen()
    }
    unstable {
      emailen()
    }
    changed {
      emailen()
    }
  }
}

def emailen() {
  mail(
    to: "tvl@scoutsengidsenvlaanderen.be,ricardo@inuits.eu,${env.CHANGE_AUTHOR_EMAIL}",
    subject: "[Jenkins] ${currentBuild.fullDisplayName} ${currentBuild.currentResult}",
    body: """${currentBuild.fullDisplayName} ${currentBuild.currentResult}

${currentBuild.absoluteUrl}"""
  )
}
