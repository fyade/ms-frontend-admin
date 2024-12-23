import focus from "@/dicevtive/modules/focus.ts";
import hasPerm from "@/dicevtive/modules/hasPerm.ts";
import noMoreClick from "@/dicevtive/modules/noMoreClick.ts";
import { ObjectDirective } from "vue";
import { App } from "@vue/runtime-core";

export interface directiveBinding<T = any> {
  value: T
}

const directivesList: {
  [key: string]: ObjectDirective
} = {
  focus,
  hasPerm,
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
