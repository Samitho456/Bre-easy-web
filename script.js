Vue.createApp({
    data() {
        return {
            windows: [],
            rooms: [],
            roomSelected: 0
        };
    },

    // Fetch windows and rooms when the page is loaded
    mounted() {
        this.getRooms();
        this.getWindows();
    },

    methods: {
        // Toggle window open/closed state
        toggleWindow(windowId) {
            this.windows.forEach((window) => {
                if (window.id === windowId) {
                    window.isOpen = !window.isOpen;

                    if (window.isOpen) {
                        window.timeLastOpened = new Date().toISOString();
                    }

                    const requestOptions = {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: window.id,
                            windowName: window.name,
                            locationId: window.roomId,
                            isOpen: window.isOpen,
                            timeLastOpened: window.timeLastOpened,
                        }),
                    };

                    fetch(`https://breeasy.azurewebsites.net/api/windows/${window.id}`, requestOptions)
                        .then((response) => response.json())
                        .then((data) => console.log(data))
                        .catch((error) =>
                            console.error("Error updating window:", error)
                        );
                }
            });
        },

        // Fetch rooms from the API
        getRooms() {
            fetch("https://breeasy.azurewebsites.net/api/Locations")
                .then((response) => response.json())
                .then((data) => {
                    this.rooms = data.map((room) => ({
                        id: room.id,
                        name: room.locationName ?? room.LocationName,
                        humidity: room.humidity ?? room.Humidity,
                    }));
                })
                .catch((error) => console.error("Error fetching rooms:", error));
        },

        // Fetch windows from the API
        getWindows() {
            fetch("https://breeasy.azurewebsites.net/api/windows")
                .then((response) => response.json())
                .then((data) => {
                    this.windows = data.map((window) => ({
                        id: window.id,
                        name: window.windowName,
                        roomId: window.locationId,
                        isOpen: window.isOpen,
                        timeLastOpened: window.timeLastOpened,
                    }));
                })
                .catch((error) => console.error("Error fetching windows:", error));
        },
    },
}).mount("#app");
