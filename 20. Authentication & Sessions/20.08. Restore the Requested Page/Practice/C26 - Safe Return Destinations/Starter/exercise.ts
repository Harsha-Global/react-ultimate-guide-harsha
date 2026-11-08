const APP_ORIGIN = "https://cedar.example";

function safeReturnTo(value: string | null): string {
  // TODO: validate the candidate and preserve an allowed account search/hash.
  return "/account";
}
