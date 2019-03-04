function World1() {

    // create circular room


    // create half cirular room

    // level Generation (88x33)
    var worldGeneration = new Array(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    );


    // generate first room and get dimensions
    var vDirection;
    var hDirection;
    var startingPosition = generateRandomNumber(0, 524);
    var currentPosition = startingPosition;
    var firstRoom = generateRectangle(6, 50, 6, 50);
    var xDimension = firstRoom[firstRoom.length - 2];
    var yDimension = firstRoom[firstRoom.length - 1]
    var roomArea = xDimension * yDimension;
    var offset = 25 - xDimension;
    var tileCount = 0;
    // correct starting position for copy
    if (startingPosition % 25 >= xDimension) {
        hDirection = "left";
    }
    else {
        hDirection = "right";
    }
    if (Math.ceil(startingPosition / 25) >= yDimension) {
        vDirection = "up";
    }
    else {
        vDirection = "down";
    }
    if (hDirection == "left" && vDirection == "up") {
        startingPosition = startingPosition - (xDimension + (yDimension * 25));
    }
    else if (hDirection == "left" && vDirection == "down") {
        startingPosition = (startingPosition - xDimension) + (yDimension * 25);
    }
    else if (hDirection == "right" && vDirection == "up") {
        startingPosition = (startingPosition + xDimension) - (yDimension * 25);
    }
    else {
        // do nothing
    }
    // copy room to game world
    for (var i = 0; i < roomArea; i++) {
        if (tileCount < xDimension && firstRoom[i] != 0) {
            worldGeneration[currentPosition] = firstRoom[i];
            currentPosition++;
            tileCount++;
        }
        else if (tileCount < xDimension && firstRoom[i] == 0) { // skipping the blank tiles
            currentPosition++;
            tileCount++;
        }
        if (tileCount == xDimension) {
            tileCount = 0;
            currentPosition += offset;
        }
    }
    /*----------------------------------------------Dungeon Procedural Generation End---------------------------------------------------------------------------- */

    /*----------------------------------------------Dungeon Array for level 1 Start------------------------------------------------------------------------------ */
    /*
    * Slime Dungeon Level 1 (88x33) each number is a 32x32 pixel area
    * 0 = no block (should layer background image so these are not just a solid color)
    * 1-4 = alternating horizontal wall tiles, 5 = Vertical wall tile, 6 = Top Left L shaped corner, 7 = Top Right L shaped corner,
    * 8 = Bottom Left L shaped corner, 9 = Bottom Right L shaped corner, 10 = North T shaped wall, 11 = East T shaped wall,
    * 12 = West T shaped wall, 13 = South T shaped wall, 14 = + shaped wall, 15 = Horizontal wall with door,
    * 16 = North floor, 17 = East floor, 18 = West floor, 19 = South floor, 20 = Top Left L floor, 21 = Top Right L floor,
    * 22 = Bottom Left L floor, 23 = Bottom Right L floor, 24 = Center floor, 25 = silver key platform floor, 26 = gold key platform floor,
    * 27 = healing potion floor, 28 = Soul Jar floor,
    * 33 = player starting Position floor, 34 = sorcererVillain starting position floor, 35 = slimeEnemy starting position floor,
    * 36 = slimeBehemoth starting position floor, 37 = wizard starting position, 38 = skeleton starting position.
    */
    var slimeDungeonLevelOne = new Array(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 2, 1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 2, 1, 7, 0, 0, 0, 0, 6, 3, 4, 7, 0, 0, 0, 0, 6, 1, 1, 2, 1, 4, 1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 20, 16, 21, 12, 1, 2, 1, 2, 1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 20, 16, 21, 3, 7, 0, 6, 2, 1, 20, 21, 2, 1, 7, 0, 6, 3, 20, 16, 16, 16, 16, 25, 12, 1, 2, 2, 2, 2, 1, 7, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 6, 1, 2, 1, 1, 2, 2, 1, 3, 4, 1, 1, 1, 2, 2, 1, 1, 1, 3, 1, 1, 2, 1, 11, 18, 28, 17, 5, 20, 16, 16, 16, 21, 1, 7, 0, 0, 0, 6, 1, 2, 1, 10, 10, 4, 1, 20, 24, 24, 24, 21, 2, 10, 1, 20, 16, 24, 24, 16, 21, 1, 2, 11, 20, 24, 24, 19, 19, 19, 23, 5, 20, 16, 16, 16, 16, 21, 1, 3, 1, 4, 7, 0, 0,
        0, 0, 0, 0, 5, 20, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 21, 5, 22, 19, 23, 5, 22, 19, 19, 24, 24, 21, 3, 1, 2, 1, 4, 20, 16, 21, 3, 4, 20, 16, 24, 24, 24, 24, 24, 21, 1, 20, 24, 24, 24, 24, 24, 24, 16, 21, 5, 22, 24, 17, 6, 1, 2, 1, 3, 18, 24, 19, 19, 19, 24, 16, 16, 16, 25, 5, 0, 0,
        0, 0, 0, 0, 5, 18, 24, 24, 24, 24, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 24, 36, 1, 3, 15, 4, 1, 1, 1, 2, 18, 24, 24, 16, 16, 16, 16, 16, 24, 24, 24, 16, 16, 24, 19, 24, 24, 24, 24, 24, 24, 16, 24, 24, 24, 24, 24, 24, 24, 24, 17, 2, 7, 18, 17, 5, 20, 16, 16, 16, 24, 23, 6, 10, 7, 18, 24, 24, 24, 17, 5, 0, 0,
        0, 0, 0, 0, 5, 18, 24, 24, 24, 17, 1, 2, 1, 10, 1, 2, 1, 2, 3, 4, 1, 1, 2, 1, 7, 18, 24, 16, 16, 16, 16, 16, 16, 16, 16, 24, 24, 24, 24, 24, 19, 19, 19, 19, 19, 19, 19, 24, 17, 5, 22, 24, 24, 24, 24, 19, 19, 19, 19, 24, 24, 24, 24, 24, 24, 24, 21, 5, 18, 17, 5, 18, 24, 19, 19, 23, 6, 1, 1, 5, 22, 19, 19, 19, 23, 5, 0, 0,
        0, 0, 0, 0, 5, 18, 24, 24, 24, 24, 16, 16, 21, 5, 20, 16, 16, 16, 16, 16, 16, 16, 16, 28, 5, 18, 24, 24, 24, 24, 24, 24, 24, 19, 19, 24, 24, 24, 24, 17, 6, 10, 10, 10, 1, 1, 7, 18, 17, 1, 7, 18, 24, 24, 17, 1, 10, 10, 7, 18, 24, 24, 24, 24, 24, 24, 17, 5, 18, 17, 5, 18, 17, 2, 1, 1, 2, 20, 21, 3, 1, 2, 1, 1, 1, 4, 7, 0,
        0, 0, 0, 0, 5, 22, 19, 19, 19, 19, 19, 24, 17, 5, 18, 24, 24, 24, 24, 19, 19, 19, 19, 23, 5, 18, 24, 24, 24, 24, 24, 24, 23, 6, 1, 18, 24, 24, 24, 17, 2, 1, 2, 11, 27, 21, 5, 18, 24, 21, 1, 18, 24, 24, 24, 21, 12, 1, 1, 18, 24, 24, 24, 24, 24, 24, 17, 5, 18, 17, 5, 18, 24, 16, 16, 16, 16, 24, 24, 16, 16, 16, 16, 16, 16, 21, 5, 0,
        0, 0, 0, 6, 1, 1, 2, 1, 1, 10, 7, 18, 17, 5, 18, 35, 24, 24, 17, 6, 10, 10, 10, 1, 11, 22, 19, 19, 19, 19, 19, 23, 6, 1, 20, 24, 24, 24, 24, 24, 16, 16, 21, 5, 18, 17, 2, 7, 22, 24, 16, 24, 24, 24, 24, 17, 3, 20, 16, 24, 24, 24, 24, 24, 24, 24, 17, 5, 18, 17, 5, 22, 24, 24, 24, 24, 24, 19, 19, 19, 19, 19, 19, 19, 24, 17, 5, 0,
        0, 0, 6, 4, 20, 16, 16, 16, 21, 4, 3, 18, 17, 5, 18, 24, 24, 24, 17, 1, 14, 14, 2, 24, 1, 1, 2, 3, 2, 4, 2, 1, 1, 20, 24, 24, 24, 24, 24, 24, 24, 24, 17, 5, 18, 24, 21, 4, 7, 22, 19, 19, 19, 19, 24, 24, 16, 24, 24, 19, 24, 24, 19, 19, 19, 19, 23, 5, 18, 17, 1, 7, 18, 24, 24, 24, 17, 1, 1, 1, 1, 1, 1, 1, 18, 17, 4, 7,
        0, 6, 1, 20, 24, 24, 19, 24, 24, 16, 16, 24, 17, 5, 22, 24, 24, 24, 24, 21, 1, 11, 20, 24, 16, 16, 16, 16, 16, 16, 16, 16, 16, 24, 24, 24, 24, 24, 24, 24, 24, 24, 17, 5, 18, 24, 24, 21, 1, 2, 1, 3, 4, 7, 22, 19, 24, 24, 23, 5, 18, 17, 6, 4, 1, 1, 1, 3, 18, 24, 21, 5, 18, 24, 24, 24, 24, 16, 16, 16, 16, 16, 16, 16, 24, 24, 21, 5,
        0, 5, 20, 24, 24, 23, 5, 18, 24, 19, 19, 24, 17, 4, 7, 18, 24, 24, 24, 24, 21, 5, 37, 24, 19, 19, 19, 19, 19, 19, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 17, 5, 18, 24, 24, 24, 16, 16, 16, 16, 21, 12, 1, 7, 22, 23, 6, 4, 18, 17, 1, 20, 16, 16, 16, 16, 24, 24, 17, 5, 18, 24, 24, 24, 19, 19, 19, 19, 19, 24, 24, 24, 24, 24, 17, 5,
        0, 5, 18, 24, 17, 1, 1, 18, 17, 6, 7, 22, 24, 21, 2, 7, 19, 19, 19, 19, 23, 5, 18, 17, 6, 4, 3, 4, 3, 7, 22, 19, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 17, 5, 18, 24, 24, 24, 24, 19, 24, 24, 23, 5, 24, 1, 1, 1, 4, 20, 24, 24, 16, 24, 24, 24, 24, 24, 24, 24, 17, 5, 22, 24, 24, 23, 6, 3, 2, 4, 7, 18, 24, 19, 19, 19, 23, 5,
        0, 5, 18, 24, 24, 16, 16, 24, 23, 12, 1, 7, 22, 24, 21, 1, 1, 3, 15, 4, 2, 11, 18, 17, 5, 20, 16, 16, 21, 1, 1, 7, 22, 19, 19, 19, 19, 24, 24, 24, 19, 19, 23, 5, 22, 19, 19, 19, 23, 5, 22, 23, 6, 11, 18, 16, 16, 16, 16, 24, 19, 19, 19, 24, 24, 24, 24, 24, 24, 24, 38, 2, 7, 22, 23, 6, 4, 20, 16, 21, 1, 18, 17, 1, 2, 1, 10, 9,
        0, 5, 22, 24, 24, 24, 19, 23, 6, 1, 24, 1, 7, 22, 24, 16, 16, 16, 16, 16, 21, 5, 18, 17, 5, 22, 19, 24, 24, 16, 21, 1, 1, 2, 4, 1, 7, 22, 19, 23, 6, 1, 4, 2, 1, 1, 2, 4, 3, 1, 15, 1, 3, 1, 18, 24, 24, 19, 19, 23, 6, 4, 7, 18, 24, 24, 24, 24, 24, 24, 24, 21, 1, 2, 2, 1, 20, 24, 24, 24, 16, 24, 24, 16, 16, 21, 5, 0,
        0, 8, 7, 18, 24, 23, 6, 1, 2, 20, 24, 21, 1, 7, 22, 19, 19, 19, 19, 24, 17, 5, 18, 17, 1, 4, 7, 22, 24, 24, 24, 16, 16, 16, 16, 21, 4, 1, 1, 2, 11, 20, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 24, 19, 23, 6, 10, 1, 1, 24, 5, 18, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 16, 24, 24, 24, 24, 19, 19, 19, 24, 24, 17, 5, 0,
        0, 0, 5, 18, 17, 6, 4, 20, 16, 24, 24, 24, 21, 1, 4, 15, 3, 10, 7, 18, 17, 5, 18, 24, 16, 21, 1, 7, 22, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 21, 5, 22, 24, 19, 19, 19, 19, 19, 19, 19, 24, 24, 19, 19, 23, 6, 4, 3, 11, 20, 16, 17, 5, 22, 19, 24, 24, 24, 24, 24, 24, 24, 19, 19, 19, 19, 19, 24, 24, 17, 6, 1, 1, 18, 24, 17, 5, 0,
        0, 0, 5, 18, 17, 5, 20, 24, 24, 19, 19, 24, 24, 16, 16, 16, 21, 12, 11, 18, 17, 5, 18, 24, 24, 24, 21, 1, 7, 18, 24, 24, 24, 24, 24, 24, 24, 24, 24, 17, 1, 7, 24, 6, 1, 2, 2, 4, 3, 7, 18, 17, 6, 1, 1, 3, 20, 21, 5, 18, 24, 17, 2, 2, 7, 22, 19, 24, 24, 24, 19, 23, 6, 3, 2, 2, 7, 22, 24, 17, 5, 20, 16, 24, 24, 17, 4, 7,
        0, 0, 5, 18, 17, 5, 18, 24, 17, 6, 7, 22, 19, 24, 24, 24, 17, 12, 2, 18, 17, 5, 18, 24, 24, 24, 24, 21, 5, 18, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 21, 1, 15, 11, 20, 16, 16, 16, 21, 1, 18, 17, 1, 20, 16, 16, 24, 17, 5, 22, 19, 24, 16, 21, 1, 2, 7, 22, 19, 23, 6, 4, 2, 20, 16, 21, 1, 7, 18, 17, 1, 18, 24, 24, 24, 24, 21, 5,
        0, 0, 5, 18, 17, 5, 27, 19, 23, 12, 14, 1, 7, 22, 24, 24, 17, 5, 20, 24, 17, 5, 18, 24, 24, 24, 24, 17, 5, 18, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 16, 21, 5, 18, 24, 24, 24, 24, 16, 24, 24, 16, 24, 24, 24, 24, 17, 1, 2, 1, 18, 24, 24, 16, 21, 4, 1, 1, 1, 4, 20, 16, 24, 24, 24, 21, 5, 18, 24, 16, 24, 24, 24, 24, 24, 17, 5,
        6, 1, 1, 18, 17, 1, 1, 4, 1, 2, 11, 25, 3, 7, 22, 24, 23, 5, 18, 24, 23, 5, 18, 24, 24, 24, 24, 23, 5, 18, 24, 24, 24, 24, 24, 24, 24, 24, 24, 19, 24, 24, 17, 5, 18, 24, 24, 19, 19, 19, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 24, 24, 24, 24, 24, 16, 16, 16, 16, 16, 24, 24, 24, 24, 24, 17, 5, 18, 24, 24, 24, 24, 24, 24, 24, 17, 5,
        5, 20, 16, 24, 24, 16, 16, 16, 16, 21, 5, 18, 21, 4, 7, 24, 6, 2, 18, 17, 6, 1, 18, 24, 24, 24, 23, 6, 3, 18, 24, 24, 24, 24, 24, 24, 24, 24, 23, 5, 18, 24, 17, 5, 18, 24, 17, 1, 1, 7, 18, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 19, 24, 24, 24, 24, 24, 24, 24, 24, 17, 1, 7, 22, 19, 19, 19, 24, 24, 24, 17, 5,
        5, 18, 24, 24, 24, 24, 19, 19, 24, 17, 5, 18, 24, 21, 3, 10, 1, 20, 24, 17, 5, 20, 24, 24, 24, 23, 6, 2, 20, 34, 24, 24, 24, 24, 24, 24, 24, 23, 6, 11, 18, 24, 17, 5, 18, 24, 24, 16, 21, 5, 22, 19, 19, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 17, 5, 22, 24, 24, 24, 24, 24, 24, 24, 24, 21, 1, 4, 2, 1, 7, 18, 24, 24, 17, 5,
        5, 18, 35, 24, 24, 17, 6, 7, 18, 17, 5, 18, 24, 24, 21, 5, 20, 24, 24, 23, 5, 18, 24, 24, 23, 6, 4, 20, 24, 24, 24, 24, 24, 24, 24, 24, 17, 2, 14, 11, 18, 24, 17, 5, 18, 24, 24, 24, 17, 2, 2, 3, 1, 18, 24, 24, 24, 24, 24, 19, 24, 24, 24, 24, 24, 24, 17, 3, 7, 18, 24, 24, 24, 24, 24, 24, 24, 24, 16, 16, 16, 21, 5, 22, 19, 19, 17, 5,
        5, 18, 24, 24, 24, 17, 2, 4, 18, 17, 5, 18, 35, 24, 17, 5, 18, 24, 17, 1, 11, 18, 24, 17, 2, 11, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 21, 12, 1, 18, 24, 17, 5, 18, 24, 24, 24, 24, 16, 16, 16, 16, 24, 24, 24, 24, 24, 17, 5, 22, 19, 19, 24, 24, 24, 24, 21, 5, 18, 24, 24, 24, 24, 24, 24, 19, 19, 24, 24, 24, 17, 12, 1, 4, 7, 24, 5,
        5, 18, 24, 19, 19, 24, 16, 16, 24, 17, 5, 18, 24, 24, 23, 5, 22, 24, 24, 21, 5, 22, 24, 24, 21, 3, 7, 22, 24, 24, 24, 24, 24, 24, 24, 24, 24, 17, 2, 20, 24, 24, 17, 5, 18, 24, 24, 24, 24, 24, 19, 19, 19, 24, 19, 19, 19, 19, 17, 12, 10, 10, 1, 18, 24, 24, 24, 23, 5, 18, 24, 24, 24, 24, 24, 17, 6, 7, 18, 24, 19, 23, 5, 20, 21, 5, 24, 5,
        5, 18, 17, 6, 7, 18, 24, 24, 24, 17, 5, 18, 24, 17, 1, 14, 4, 18, 24, 17, 2, 7, 18, 24, 24, 21, 12, 1, 18, 24, 24, 24, 24, 24, 24, 24, 24, 24, 16, 24, 24, 24, 17, 5, 18, 24, 24, 24, 24, 23, 6, 1, 7, 24, 6, 2, 4, 7, 24, 12, 3, 4, 20, 24, 24, 24, 17, 6, 2, 18, 24, 24, 24, 24, 24, 17, 4, 1, 18, 17, 1, 2, 3, 18, 17, 2, 10, 9,
        5, 18, 17, 3, 4, 18, 24, 24, 24, 17, 5, 18, 24, 24, 21, 1, 20, 24, 24, 24, 24, 5, 18, 24, 24, 17, 12, 24, 24, 24, 24, 24, 24, 24, 24, 19, 24, 24, 24, 24, 24, 24, 17, 5, 18, 24, 24, 24, 23, 6, 2, 0, 2, 3, 1, 0, 0, 5, 24, 5, 20, 16, 24, 24, 24, 24, 17, 5, 24, 19, 19, 24, 24, 24, 24, 24, 16, 16, 24, 24, 16, 16, 16, 24, 24, 21, 5, 0,
        5, 18, 24, 16, 16, 24, 24, 24, 33, 17, 5, 18, 24, 19, 24, 16, 24, 19, 19, 23, 6, 4, 18, 24, 24, 23, 12, 3, 18, 24, 24, 24, 24, 24, 23, 5, 22, 24, 24, 24, 24, 24, 23, 5, 22, 19, 24, 23, 6, 2, 0, 0, 0, 0, 0, 0, 0, 1, 10, 3, 18, 24, 24, 24, 24, 24, 17, 2, 1, 3, 7, 18, 24, 24, 24, 24, 24, 24, 19, 19, 19, 19, 24, 24, 24, 17, 5, 0,
        5, 22, 19, 19, 19, 19, 19, 19, 19, 23, 5, 18, 23, 5, 22, 24, 23, 6, 1, 4, 2, 20, 24, 19, 23, 6, 11, 24, 24, 34, 24, 24, 24, 24, 6, 13, 7, 18, 24, 24, 24, 17, 6, 13, 1, 7, 24, 6, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 20, 24, 19, 19, 19, 24, 24, 24, 16, 16, 21, 5, 18, 24, 24, 24, 24, 24, 17, 6, 1, 1, 1, 7, 18, 24, 17, 5, 0,
        8, 1, 1, 1, 1, 2, 2, 2, 1, 2, 11, 24, 6, 1, 7, 24, 6, 11, 20, 16, 16, 24, 23, 6, 1, 13, 13, 7, 22, 19, 19, 19, 19, 23, 5, 0, 5, 18, 24, 24, 19, 23, 5, 0, 0, 8, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 22, 23, 6, 1, 7, 22, 24, 24, 24, 24, 23, 5, 22, 19, 19, 24, 24, 19, 23, 5, 0, 0, 0, 5, 22, 19, 26, 5, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1, 9, 0, 8, 1, 14, 11, 25, 19, 19, 23, 6, 9, 0, 0, 0, 8, 1, 1, 1, 1, 1, 1, 9, 0, 5, 22, 19, 23, 6, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1, 1, 9, 0, 8, 7, 22, 19, 19, 23, 6, 14, 1, 1, 7, 22, 23, 6, 1, 9, 0, 0, 0, 8, 1, 1, 1, 9, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1, 1, 1, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1, 2, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1, 1, 1, 1, 1, 9, 0, 0, 8, 1, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    );

    /*
    * Slime Dungeon Level 1 entity array (88x33) each number is a 48x48 pixel space
    *
    */
    var slimeDungeonLevelOneEntities = new Array(
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    );
    // Loop to generate each entity
    for (var i = 0; i < slimeDungeonLevelOne.length; i++) {
        // Generates the position of each torch within the entity array
        if (slimeDungeonLevelOne[i] >= 1 && slimeDungeonLevelOne[i] <= 4) {
            slimeDungeonLevelOneEntities[i] = 1; // adds a torch to the entities array
        }
        if (slimeDungeonLevelOne[i] == 25) {
            slimeDungeonLevelOneEntities[i] = 2; // adds a silverKey to the entities array
        }
        if (slimeDungeonLevelOne[i] == 26) {
            slimeDungeonLevelOneEntities[i] = 3; // adds a goldKey to the entities array
        }
        if (slimeDungeonLevelOne[i] == 27) {
            slimeDungeonLevelOneEntities[i] = 4; // adds a healingPotion to the entities array
        }
        if (slimeDungeonLevelOne[i] == 28) {
            slimeDungeonLevelOneEntities[i] = 5; // adds a SoulJar to the entities array
        }
        if (slimeDungeonLevelOne[i] == 33) {
            slimeDungeonLevelOneEntities[i] = 10; // adds the playerCharacter to the entities array
        }
        if (slimeDungeonLevelOne[i] == 34) {
            slimeDungeonLevelOneEntities[i] = 11; // adds a SorcererVillain to the entities array
        }
        if (slimeDungeonLevelOne[i] == 35) {
            slimeDungeonLevelOneEntities[i] = 12; // adds a slimeEnemy to the entities array
        }
        if (slimeDungeonLevelOne[i] == 36) {
            slimeDungeonLevelOneEntities[i] = 13; // adds a slimeBehemoth to the entities array
        }
        if (slimeDungeonLevelOne[i] == 37) {
            slimeDungeonLevelOneEntities[i] = 14; // adds a wizard to the entities array
        }
        if (slimeDungeonLevelOne[i] == 38) {
            slimeDungeonLevelOneEntities[i] = 15; // adds a skeleton to the entities array
        }

    };
    /*----------------------------------------------Dungeon Array for level 1 End-------------------------------------------------------------------------------- */


/*----------------------------------------------Background for level 1 Start--------------------------------------------------------------------------------- */
var currentScale = 48; // number of pixels
var currentWTiles = 88; // number of tiles width wise on the map
function Background(spritesheet) {
    this.x = 0;
    this.y = 0;
    this.sw = 48;
    this.sh = 48;
    this.dw = currentScale;
    this.dh = currentScale;
    this.spritesheet = spritesheet;
};
Background.prototype = new Entity();
Background.prototype.constructor = Background;
Background.prototype.update = function () { }
Background.prototype.draw = function () {
    var spriteX = 0;
    var spriteY = 0;
    var count = 0;
    var torchCounter = 0;
    var x = this.x;
    var y = this.y;

    // Loop to generate each tile
    for (var i = 0; i < slimeDungeonLevelOne.length; i++) {
        spriteX = (slimeDungeonLevelOne[i] - 1) * 48; // 32 is the number of pixels per sprite
        ctx.drawImage(this.spritesheet, spriteX, spriteY, this.sw, this.sh, x, y, this.dw, this.dh);
        count++;
        if (count >= currentWTiles) // change the value based on how many tiles you will draw. (88 atm)
        {
            x = this.x;
            y += currentScale;
            count = 0;
        }
        else {
            x += currentScale;
        }
    };
};
/*----------------------------------------------Background for level 1 End----------------------------------------------------------------------------------- */


    return {slimeDungeonLevelOne, slimeDungeonLevelOneEntities, currentWTiles, currentScale, Background};
}
