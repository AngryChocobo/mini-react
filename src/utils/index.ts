export function lowercaseFirstLetter(str: string) {
  if (str && str.length > 0) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
  return str;
}
