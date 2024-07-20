import focus from "@/dicevtive/modules/focus.ts";
import noMoreClick from "@/dicevtive/modules/noMoreClick.ts";
import { ObjectDirective } from "vue";

const directivesList: {
  [key: string]: ObjectDirective
} = {
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
