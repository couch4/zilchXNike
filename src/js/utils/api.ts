export function fetchData() {
  const domainRoot = window.location.origin;
  const rnd = Math.round(Math.random() * 100);
  const url = `${domainRoot}/data/zilch.json?rnd=${rnd}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response failed");
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error);
    });
}
