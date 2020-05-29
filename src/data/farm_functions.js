import store from "../store";

let map_functions = {
    renderMarkers() {
        var groups = store.state.groups.data;
        var farms_to_show = store.state.farms.data;

        for (var index in groups) {
            for (var farmIndex in groups[index].farmsIncluded) {
                var farmID = groups[index].farmsIncluded[farmIndex]
                farms_to_show = deleteObjectByValue(farms_to_show, 'id', farmID);
            }
        }
        return farms_to_show;
    },
    handleMarkersInGroup(farms_to_show, groupID) {
        var all_farms = store.state.farms.data;
        var farmsInGroup = findObject(store.state.groups.data, 'id', groupID);
        farmsInGroup = farmsInGroup[0].farmsIncluded;

        for (var index in farmsInGroup) {
            farms_to_show.push(findObject(all_farms, 'id', farmsInGroup[index])[0]);
        }
        return farms_to_show;
    },
    renderMarkers2(id) {
        var groups = store.state.groups.data;
        var farms_in_groups = [];

        for (var index in groups) {
            if (groups[index].id != id) {
                for (var farmIndex in groups[index].farmsIncluded) {
                    var farmID = groups[index].farmsIncluded[farmIndex];
                    farms_in_groups.push(farmID);
                }
            }
        }
        return farms_in_groups;
    },
    findFarmsInGroup(id) {
        var groups = store.state.groups.data;
        var farms_in_groups = [];

        for (var index in groups) {
            if (groups[index].id == id) {
                for (var farmIndex in groups[index].farmsIncluded) {
                    var farmID = groups[index].farmsIncluded[farmIndex];
                    if (store.state.farms.active_ids.includes(farmID)) {
                        farms_in_groups.push(farmID);
                    }
                }
            }
        }
        return farms_in_groups;
    },
    findFarm(id, value) {
        var all_farms = store.state.farms.data;
        return findObject(all_farms, id, value)[0];
    },
    findFarm2(ids, values) {
        ids = ['id', 'category']
        values = [2, !'cattle farm']

        var farms_to_show = store.state.farms.data;

        for (var index in ids) {
            farms_to_show = findObject(farms_to_show, ids[index], values[index]);
        }

        return farms_to_show;
    },
    filterFarms(farms, filterValue) {
        var farms_to_show = farms;
        switch (filterValue) {
            case 'Less than 200km from me':
                for (var index in farms) {
                    if (this.calculateDistance(store.state.profile.data.geoCode, farms.data.location) < 200) {
                        farms_to_show = findObject(farms, 'id', farms[index]['id'])
                    }
                }
                break;
            case 'Easy Apply Enabled':
                farms_to_show = filterObjectByKey(farms_to_show, 'email');
                break;
            case 'Farms with Website':
                farms_to_show = filterObjectByKey(farms_to_show, 'website');
                break;
            case 'Animal free work (V)':
                farms_to_show = deleteObjectByValue(farms_to_show, 'category', 'Cattle Farm');
                break;
            case 'Animal related work':
                farms_to_show = findObject(farms_to_show, 'category', 'Cattle Farm');
                break;
            case 'Vineyards':
                farms_to_show = findObject(farms_to_show, 'category', 'Vineyard');
                break;
            default:
                break;
        }
        return farms_to_show
    },
    filterFarms2(farms, filterValue) {
        farms = this.filterFarms(farms, filterValue);
        var farms_to_show = new Array;
        for (var index in farms) {
            farms_to_show.push(farms[index].id);
        }

        return farms_to_show;
    },
    calculateDistance(geoCode1, geoCode2) {
        var lat1 = geoCode1[1];
        var lon1 = geoCode1[0];
        var lat2 = geoCode2[1];
        var lon2 = geoCode2[0];
        const R = 6371e3; // metres
        const phi1 = lat1 * Math.PI / 180;
        const phi2 = lat2 * Math.PI / 180;
        const delta_phi = (lat2 - lat1) * Math.PI / 180;
        const delta_gamma = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(delta_gamma / 2) * Math.sin(delta_gamma / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c; // in metres

        return (d / 1000).toFixed(2) // return distance in kilometres
    },
    sortFarmsByDistance(farms) {
        for (var index in farms) {
            var distance = this.calculateDistance(store.state.profile.data.Geo, farms[index].location);
            farms[index]["distance"] = distance;
        }

        farms.sort(function (a, b) {
            return a.distance - b.distance;
        });

        return farms;
    }
}

export default map_functions

let deleteObjectByValue = (array, key, value) => {
    return array.filter((e) => {
        if (e && e.hasOwnProperty(key) && e[key] === value) {
            return false;
        }

        return true;
    });
};

let filterObjectByKey = (array, key) => {
    return array.filter((e) => {
        if (e && e.hasOwnProperty(key)) {
            return true;
        }

        return false;
    });
};

let findObject = (array, key, value) => {
    return array.filter((e) => {
        if (e && e.hasOwnProperty(key) && e[key] === value) {
            return true;
        }

        return false;
    });
};