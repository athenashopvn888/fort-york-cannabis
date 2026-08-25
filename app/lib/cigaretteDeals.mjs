export const APPROVED_CIGARETTE_DEAL_SKUS = new Set([
  "1000",
  "1001",
  "1002",
  "1003",
  "1005",
  "1006",
  "1008",
  "1009",
  "1011",
  "1012",
  "1013",
  "1014",
  "1015",
  "1016",
  "1017",
  "1018",
  "1019",
  "1020",
]);

export const CIGARETTE_CARTON_LABEL = "$25 Carton";
export const CIGARETTE_MIX_MATCH_LABEL = "2 Pack $5 Mix & Match";

function splitSkus(sku) {
  return String(sku || "").match(/\d+/g) || [];
}

export function isCigaretteDealSku(sku) {
  return splitSkus(sku).some((value) => APPROVED_CIGARETTE_DEAL_SKUS.has(value));
}

export function isCigaretteMixAndMatchSku(sku) {
  return splitSkus(sku).includes("1016");
}
