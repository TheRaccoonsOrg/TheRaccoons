export const subscribeToNewsletter = async (values: { email: string }) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LISTMONK_API_URL}/api/public/subscription`,
      requestOptions,
    );
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};
