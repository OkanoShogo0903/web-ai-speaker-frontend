function request(body_text, axi) {
    console.log(body_text)
    let endpoint = "https://web-ai-speaker-backend.herokuapp.com/speech", // "http://localhost:8080/speech"

    axi.post(endpoint, {text: body_text})
    .then(res => {
        console.log(res.status);
        console.log(res.data);
        if(res.status === 200){
            return [res.data.text, res.data.question]
        }
    })
    .catch(error => {
            console.log(error);
            return null
    });
}

export default { request }
