
export const SHIP_ROCKET_API = "https://apiv2.shiprocket.in/v1/external"

export const shipRocketLogin = (callBackFunction) => {
    const body = {
        email: "ashok@realfoods.in",
        password: "Admin@123+"
    }
    fetch(`${SHIP_ROCKET_API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.status;
      }
    }).then((data) => {
        if (Number.isInteger(data)) {
            console.log("Error ", data);
        return data;
      } else {
            if (data) {
                const token = data.token;
                localStorage.setItem("SHIP_ROCKET", token);
                callBackFunction(data);
         }
        return data;
      }
    })
}


export const fetchPicupPoints = (callBackFunction) => {
    const token = localStorage.getItem("SHIP_ROCKET");
    if (token) {
        fetch(`${SHIP_ROCKET_API}/settings/company/pickup`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${token}`
            }
        }).then((data) => {
            if (Number.isInteger(data)) {
                callBackFunction(data);
                return data;
            } else {
                callBackFunction(data);
                return data;
            }
        }).then((data) => {
            console.log("Pick up ", data);
            if (Number.isInteger(data)) {
                console.log("Error ", data);
                return data;
            } else {
                if (data) {
                    callBackFunction(data);
                }
                return data;
            }
        })
    }
}
