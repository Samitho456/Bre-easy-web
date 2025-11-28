Vue.createApp({
  data() {
    return {
      // windows: [
      //   { id: 1, isOpen: false, roomId: 1, name: "Window 1" },
      //   { id: 2, isOpen: false, roomId: 1, name: "Window 2" },
      //   { id: 3, isOpen: false, roomId: 1, name: "Window 3" },
      //   { id: 4, isOpen: false, roomId: 2, name: "Window 4" },
      //   { id: 5, isOpen: false, roomId: 2, name: "Window 5" },
      //   { id: 6, isOpen: false, roomId: 3, name: "Window 6" },
      //   { id: 7, isOpen: false, roomId: 3, name: "Window 7" },
      // ],

      windows: [],
      roomSelected: 0,

      rooms: [
        {
          id: 1,
          name: "Stue",
        },
        {
          id: 2,
          name: "Køkken",
        },
        {
          id: 3,
          name: "Soveværelse",
        },
      ],
    };
  },
  // Fetch windows and rooms when the page is loaded
  mounted() {
    // this.getRooms();
    this.getWindows();
  },
  methods: {
    // Toggle window open/closed state
    toggleWindow(windowId) {
      this.windows.forEach((window) => {
        if (window.id === windowId) {
          window.isOpen = !window.isOpen;
          console.log(
            window.name + " is now " + (window.isOpen ? "open" : "closed")
          );
          // try {
          //   fetch("http://localhost:5082/api/windows")
          //     .then((response) => response.json())
          //     .then((data) => {
          //       console.log("Chuck Norris Joke:", data);
          //     });
          // } catch (error) {
          //   console.error("Error fetching Chuck Norris joke:", error);
          // }
        }
      });
    },
    // Fetch rooms from the API
    getRooms() {
      try {
        fetch("http://localhost:5082/api/Locations")
          .then((response) => response.json())
          .then((data) => {
            // Map API properties to template expectations
            this.windows = data.map((window) => ({
              id: window.id,
              name: window.windowName,
              roomId: window.locationId,
              isOpen: window.isOpen,
              timeLastOpened: window.timeLastOpened,
            }));
          });
      } catch (error) {
        console.error("Error fetching windows:", error);
      }
    },
    // Fetch windows from the API
    getWindows() {
      try {
        fetch("http://localhost:5082/api/windows")
          .then((response) => response.json())
          .then((data) => {
            // Map API properties to template expectations
            this.windows = data.map((window) => ({
              id: window.id,
              name: window.windowName,
              roomId: window.locationId,
              isOpen: window.isOpen,
              timeLastOpened: window.timeLastOpened,
            }));
          });
      } catch (error) {
        console.error("Error fetching windows:", error);
      }
    },
  },
}).mount("#app");
