import { onRequestOptions as __api_contact_js_onRequestOptions } from "D:\\ANDREUMATIC\\ANDREUMATIC-WEB-PUB\\functions\\api\\contact.js"
import { onRequestPost as __api_contact_js_onRequestPost } from "D:\\ANDREUMATIC\\ANDREUMATIC-WEB-PUB\\functions\\api\\contact.js"

export const routes = [
    {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_contact_js_onRequestOptions],
    },
  {
      routePath: "/api/contact",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contact_js_onRequestPost],
    },
  ]