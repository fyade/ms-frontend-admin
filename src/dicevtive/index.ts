import autofocus from "@/dicevtive/modules/autofocus.ts";

const directivesList = {
  autofocus
}

const directives = {
  install: function (app: any) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key])
    })
  }
}

export default directives