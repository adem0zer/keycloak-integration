import { defineStore } from "pinia";

export const useKeycloak = defineStore("keyCloak", {
  state: () => ({ data: {} as DynamicObject }),
  getters: {},
  actions: {
    addKeycloak(keyCloakData: DynamicObject) {
      this.data = keyCloakData;
    },
  },
});
