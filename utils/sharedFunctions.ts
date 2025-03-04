/**
 * we are using this to format the "match" number in each interest.
 */
export const formatTotalUsers = (total: number): string => {
  // this is Javascript built-in module to format numbers into thousand(k), million(m), billion(b)
  const formatNumber = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(total);

  return formatNumber;
}