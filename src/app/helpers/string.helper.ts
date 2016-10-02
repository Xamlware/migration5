export function ReverseString(s: string): string {
  var r = "";
  for (var i = s.length; i > 0; i--) {
    r += s[i - 1];
  }

  return r;
}
