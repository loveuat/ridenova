export const STATE_ABBREVIATIONS: Record<string, string> = {
  "Andhra Pradesh": "AP",
  "Arunachal Pradesh": "AR",
  "Assam": "AS",
  "Bihar": "BR",
  "Chhattisgarh": "CG",
  "Goa": "GA",
  "Gujarat": "GJ",
  "Haryana": "HR",
  "Himachal Pradesh": "HP",
  "Jharkhand": "JH",
  "Karnataka": "KA",
  "Kerala": "KL",
  "Madhya Pradesh": "MP",
  "Maharashtra": "MH",
  "Manipur": "MN",
  "Meghalaya": "ML",
  "Mizoram": "MZ",
  "Nagaland": "NL",
  "Odisha": "OD",
  "Punjab": "PB",
  "Rajasthan": "RJ",
  "Sikkim": "SK",
  "Tamil Nadu": "TN",
  "Telangana": "TG",
  "Tripura": "TR",
  "Uttar Pradesh": "UP",
  "Uttarakhand": "UK",
  "West Bengal": "WB",
  "Delhi": "DL",
  "Jammu and Kashmir": "JK",
  "Ladakh": "LA",
  "Puducherry": "PY",
  "Chandigarh": "CH",
}

export function abbreviateState(state: string): string {
  return STATE_ABBREVIATIONS[state] ?? state
}

/**
 * Formats a hierarchy array like ["Lalbarra", "Balaghat", "Madhya Pradesh"]
 * into "Lalbarra, Balaghat(MP)" — last item (state) gets abbreviated and
 * attached in brackets to the item before it, instead of a plain comma.
 */
export function formatHierarchy(hierarchy: string[]): string {
  if (!hierarchy || hierarchy.length === 0) return ""

  const isKnownState = (val: string) => val in STATE_ABBREVIATIONS

  const last = hierarchy[hierarchy.length - 1]

  if (isKnownState(last)) {
    const rest = hierarchy.slice(0, -1)
    const abbr = abbreviateState(last)

    if (rest.length === 0) {
      // Only a state, nothing to attach it to
      return last
    }

    const withoutLastOfRest = rest.slice(0, -1)
    const secondLast = rest[rest.length - 1]

    const tail = `${secondLast}(${abbr})`
    return [...withoutLastOfRest, tail].join(", ")
  }

  // No recognizable state at the end — just join normally
  return hierarchy.join(", ")
}