let credentials = (function () {
        const baseUrl = "https://baas.kinvey.com/";
        const appKey = "kid_SkHaVTqGx";
        const appSecret = "53990916d9bf469798b755ec323fd517";
        const kinveyAppAuthHeaders = {
            'Authorization': "Basic " + btoa(appKey + ":" + appSecret),
        };



        return {baseUrl, appKey, appSecret, kinveyAppAuthHeaders};
})();

export default credentials;