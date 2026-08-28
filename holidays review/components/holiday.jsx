import { react } from "react";

export function Holiday(props) {
  return (
    <div>
      <h1>{props.place}</h1>
      <p>{props.year}</p>
      <p>{props.highlight}</p>
    </div>
  );
}
