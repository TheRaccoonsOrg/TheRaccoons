export const subscribeToNewsletter = async (values: { email: string }) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LISTMONK_API_URL}/api/public/subscription`,
    requestOptions,
  );
  const data = await response.json();
  return data;
};
