import focus from "@/dicevtive/modules/focus.ts";
import noMoreClick from "@/dicevtive/modules/noMoreClick.ts";
import { ObjectDirective } from "vue";
import { App } from "@vue/runtime-core";

const directivesList: {
  [key: string]: ObjectDirective
} = {
  focus,
  noMoreClick
}

const directives = {
  install: function (app: App) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key])
    })
  }
}

export default directives
