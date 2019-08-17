'use strict';

module.exports = function (gender) {
    var usedGender = gender || 'all';
    usedGender = usedGender.toLowerCase();

    var prefixes = [
        { name: 'Doctor', abbreviation: 'Dr.' }
    ];

    if (usedGender === 'male' || usedGender === 'all') {
        prefixes.push({ name: 'Mister', abbreviation: 'Mr.' });
    }

    if (usedGender === 'female' || usedGender === 'all') {
        prefixes.push({ name: 'Miss', abbreviation: 'Miss' });
        prefixes.push({ name: 'Misses', abbreviation: 'Mrs.' });
    }

    return prefixes;
};
