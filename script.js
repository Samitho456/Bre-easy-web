Vue.createApp({
    data() {
        return {
            windows: [],
            rooms: [],
            roomSelected: 0,
            // isMobileMenuOpen er ikke nødvendig her, da Bootstrap håndterer dropdown-tilstanden via JS
        };
    },

    // Fetch windows and rooms when the page is loaded
    mounted() {
        this.getRooms();
        this.getWindows();
    },

    methods: {
        // Opdaterer indstillingerne for et specifikt rum (kaldes fra HTML @change)
        updateRoomSettings(room) {
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: room.id,
                    locationName: room.name,
                    humidity: room.humidity,
                    maxOpenDuration: room.maxOpenDuration,
                    maxTemperature: room.maxTemperature,
                    maxHumidity: room.maxHumidity,
                }),
            };

            fetch(`https://breeasy.azurewebsites.net/api/Locations/${room.id}`, requestOptions)
                .then((response) => response.json())
                .then((data) => console.log("Settings updated successfully for room:", data))
                .catch((error) => console.error("Error updating room settings:", error));
        },

        // Toggle window open/closed state
        toggleWindow(windowId) {
            this.windows.forEach((window) => {
                if (window.id === windowId) {
                    
                    // Find de aktuelle indstillinger for det pågældende rum
                    const currentRoom = this.rooms.find(r => r.id === window.roomId);

                    if (!currentRoom) {
                        console.error(`Room with ID ${window.roomId} not found.`);
                        return;
                    }

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
                            // Inkluderer de rums-specifikke indstillinger i payloadet
                            maxOpenDuration: currentRoom.maxOpenDuration,
                            maxTemperature: currentRoom.maxTemperature,
                            maxHumidity: currentRoom.maxHumidity,
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
                    console.log("Fetched rooms:", data);
                    this.rooms = data.map((room) => ({
                        id: room.id,
                        name: room.locationName ?? room.LocationName,
                        humidity: room.humidity ?? room.Humidity,
                        temperature: room.temperature ?? room.temperature,
                        maxOpenDuration: room.maxOpenDuration || 60,
                        maxTemperature: room.maxTemperature || 25,
                        maxHumidity: room.maxHumidity || 65,
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
                        // Vi behøver ikke gemme indstillingerne på vinduet her, 
                        // da de hentes fra RUMMET i toggleWindow()
                    }));
                })
                .catch((error) => console.error("Error fetching windows:", error));
        },
    },
}).mount("#app");