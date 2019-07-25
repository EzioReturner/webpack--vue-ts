declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.scss' {
  const scss: any;
  export default scss;
}

// declare module 'vue/types/vue' {
//   interface Vue {
//     $message: any;
//     $myGlobal: string;
//   }
//   interface VueConstructor {
//     $myGlobal: string;
//   }
// }
