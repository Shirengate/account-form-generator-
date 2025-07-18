import type { Note } from "@/types";

export function debounce(fn: Function, ms: number) {
    let timer: number;
    return function (...args: any) {
      clearTimeout(timer);
      const context = this;
      timer = window.setTimeout(function () {
        fn.apply(context, args);
      }, ms);
    };
}

export  function collectTags(arr:Note[] | undefined):string{
    return arr ?  arr.map(item => item.text).join(';') : ''
}