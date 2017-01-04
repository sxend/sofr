
export function clone<A>(obj: A): A {
  return <A>JSON.parse(JSON.stringify(obj));
}
