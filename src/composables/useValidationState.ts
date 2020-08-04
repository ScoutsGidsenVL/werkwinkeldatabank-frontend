export default function getValidationState ({ dirty, validated, valid = null }) : Boolean | null {
  return dirty || validated ? valid : null
}
