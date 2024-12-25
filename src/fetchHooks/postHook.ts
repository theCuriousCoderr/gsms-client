import API_KEY from "@/config/api";

async function postHook(url: string, body?: Record<string, string>) {
  try {
    let modifiedBody = { ...body };
    let keycountEmail = localStorage.getItem("KeyCountEmail");
    if (keycountEmail) {
      modifiedBody["email"] = keycountEmail;
    }

    let endpoint = `${API_KEY}${url}`;
    let response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedBody),
    });
    let result = await response.json();
    if (response.status === 200) {
      return { success: result.data };
    }
    if (response.status === 201) {
      return { warning: result.data };
    }
    return { error: result.data };
  } catch (err) {
    return { error: "Couldn't carry out operation" };
  }
}

export default postHook;
