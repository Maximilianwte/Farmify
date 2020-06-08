import store from "../store";

let map_functions = {
    renderMarkers2(groups, id = undefined) {
        var farms_in_groups = new Array();

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
            // I switched both statements, find got delete and around.. does it work?
            case 'Easy Apply Enabled':
                farms_to_show = filterObjectByKey(farms_to_show, 'email');
                break;
            case 'Farms with Website':
                farms_to_show = filterObjectByKey(farms_to_show, 'website');
                break;
            case 'Animal free work (V)':
                farms_to_show = deleteObjectByValue(farms_to_show, 'cropCode', '7');
                farms_to_show = deleteObjectByValue(farms_to_show, 'cropCode', '8');
                break;
            case 'Animal related work':
                farms_to_show = findObject(farms_to_show, 'cropCode', '7');
                break;
            case 'Vineyards':
                farms_to_show = findObject(farms_to_show, 'cropCode', '3');
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
            var distance = this.calculateDistance(store.state.profile.data.Geo, farms[index].geoLocation);
            farms[index]["distance"] = distance;
        }

        farms.sort(function (a, b) {
            return a.distance - b.distance;
        });

        return farms;
    },
    renderMapBoundaries(center, zoom) {
        // Maybe add display size into additive Calculation for further improvements

        // Lat boundaries
        var centerLat = center[0];
        const additiveLat = (800 / (zoom ** 2));
        var boundariesLat = [centerLat - additiveLat < 114 ? 114 : centerLat - additiveLat, null];
        boundariesLat[1] = centerLat + additiveLat > 155 ? 155 : centerLat + additiveLat;
        // Lon boundaries
        var centerLon = center[1];
        const additiveLon = (288 / (zoom ** 2));
        var boundariesLon = [centerLon + additiveLon, centerLon - additiveLon];

        return [boundariesLat, boundariesLon]
    },
    groupFarms(farms, boundaries, zoom) {
        const step = (110 / (zoom ** 2));
        var groups = new Array()
        for (var yCOR = boundaries[0][0]; yCOR <= boundaries[0][1]; yCOR = yCOR + step) {
            for (var xCOR = boundaries[1][0]; xCOR >= boundaries[1][1]; xCOR = xCOR - step) {
                var xGroup = new Array()
                var yGroup = new Array()
                var group = {
                    id: groups.length + 1,
                    geoLocation: "",
                    farmsIncluded: new Array()
                }

                for (var index in farms) {
                    var geoLocation = farms[index].geoLocation;
                    if (geoLocation[0] >= yCOR && geoLocation[0] < yCOR + step) {
                        if (geoLocation[1] >= xCOR && geoLocation[1] < xCOR + step) {
                            xGroup.push(geoLocation[0]);
                            yGroup.push(geoLocation[1]);
                            group.farmsIncluded.push(farms[index].id);
                        }
                    }
                }

                if (group.farmsIncluded.length > 5) {
                    var averageX = average(xGroup);
                    var averageY = average(yGroup);
                    group.geoLocation = [averageX, averageY]
                    groups.push(group)
                }
            }
        }
        return groups
    }
}

export default map_functions

let average = (array) => {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum += parseInt(array[i], 10); //don't forget to add the base
    }

    return sum / array.length;
}

let deleteObjectByValue = (array, key, value) => {
    return array.filter((e) => {
        if (e && e.hasOwnProperty(key) && e[key] === value) {
            return false;
        }

        return true;
    });
};

let deleteObjectByKey = (array, key, value) => {
    return array.filter((e) => {
        if (e && e.hasOwnProperty(key)) {
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