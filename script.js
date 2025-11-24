Vue.createApp({
  data() {
    return {
      rooms: [
        {
          id: 1,
          name: "Stue",
          windows: [
            { id: 1, isOpen: false, name: "Window 1" },
            { id: 2, isOpen: false, name: "Window 2" },
            { id: 3, isOpen: false, name: "Window 3" },
          ],
        },
        {
          id: 2,
          name: "Køkken",
          windows: [
            { id: 4, isOpen: false, name: "Window 4" },
            { id: 5, isOpen: false, name: "Window 5" },
          ],
        },
        {
          id: 3,
          name: "Soveværelse",
          windows: [
            { id: 6, isOpen: false, name: "Window 6" },
            { id: 7, isOpen: false, name: "Window 7" },
          ],
        },
      ],
    };
  },
}).mount("#app");
