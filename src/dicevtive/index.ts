import focus from "@/dicevtive/modules/focus.ts";
import noMoreClick from "@/dicevtive/modules/noMoreClick.ts";

const directivesList = {
  focus,
  noMoreClick
}

const directives = {
  install: function (app: any) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key])
    })
  }
}

export default directives