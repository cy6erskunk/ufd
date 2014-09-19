QUnit.module("trie");

QUnit.test("trie-many-prefix", function() {

    var dataSource = {
            "cab": {},
            "car": {},
            "cat": {},
            "catch": {}
        },
        trie = new $.ui.ufd.getNewTrie(false, true),
        result;

    for(key in dataSource){
        //console.log(key + " : " + dataSource[key]);
        trie.add(key, dataSource[key]);
    }

    //start testing
    result = trie.find("");
    QUnit.equal( result.matches.length, 4, "Empty string matches all" );
    QUnit.equal( result.misses.length, 0, "Empty string misses all" );
    result = null;

    result = trie.find("ca");
    QUnit.equal( result.matches.length, 4, "Common to all prefix" );
    QUnit.equal( result.misses.length, 0, "Common to all misses none" );
    result = null;

    result = trie.find("cat");
    QUnit.equal( result.matches.length, 2, "partial match with exact match" );
    QUnit.equal( result.misses.length, 2, "partial match with exact match, misses" );
    result = null;

    result = trie.find("cab");
    QUnit.equal( result.matches.length, 1, "Exact match" );
    QUnit.equal( result.misses.length, 3, "Exact match, no misses" );
    result = null;

    result = trie.find("cata");
    QUnit.equal( result.matches.length, 0, "Prefix with missing suffix" );
    QUnit.equal( result.misses.length, 4, "Prefix with missing suffix, misses" );
    result = null;

    result = trie.find("catamarang");
    QUnit.equal( result.matches.length, 0, "Prefix with missing suffix - longer" );
    QUnit.equal( result.misses.length, 4, "Prefix with missing suffix - longer, misses" );
    result = null;

    result = trie.find("catch");
    QUnit.ok( testResult(result, "catch", dataSource), "double check" );
    result = null;

});

test("trie-multiple-items", function() {

    var dataSource = {
            "car": {},
            "car": {},
            "car": {},
            "cat": {},
            "cat": {},
            "cat": {},
            "catamarang": {},
        },
        trie = new $.ui.ufd.getNewTrie(false, true),
        result;

    for(key in dataSource){
        //console.log(key + " : " + dataSource[key]);
        trie.add(key, dataSource[key]);
    }

    //start testing
    result = trie.find("c");
    QUnit.equal( result.matches.length, 3, "Multiple items prefix" );
    QUnit.equal( result.misses.length, 0, "Multiple items prefix" );
    result = null;

    result = trie.find("car");
    QUnit.equal( result.matches.length, 1, "Multiple items exact match" );
    QUnit.equal( result.misses.length, 2, "Multiple items exact match, misses" );
    result = null;

    result = trie.find("cat");
    QUnit.equal( result.matches.length, 2, "Multiple items exact match with longer option" );
    QUnit.equal( result.misses.length, 1, "Multiple items exact match with longer option, misses" );
    result = null;

    result = trie.find("catamarang");
    QUnit.equal( result.matches.length, 1, "Multiple items exact match." );
    QUnit.equal( result.misses.length, 2, "Multiple items exact match, misses" );
    result = null;

    result = trie.find("car-boat");
    QUnit.equal( result.matches.length, 0, "Multiple items overshoot" );
    QUnit.equal( result.misses.length, 3, "Multiple items overshoot, misses" );
    result = null;

});


/*
 * match or miss array, key, data
 */
function testResult(result, key, dataSource){
    var tritemArr, index, indexB, theSet;
    var checkMatch = false;

    do {
        theSet = checkMatch ? result.matches : result.misses;
        index = theSet.length;
        while(index--) {
            tritemArr = theSet[index];
            indexB = tritemArr.length;
            while(indexB--) { // duplicate match array
                check(tritemArr[indexB], key, dataSource, checkMatch);
            }
        }
        checkMatch = !checkMatch;
    } while(checkMatch)
    return true;
}

function check(tritem, key, dataSource, checkMatch){
    // console.log("checking for key : " + key + "; checkMatch? " + checkMatch);
    for(dsKey in dataSource){
        if (tritem === dataSource[dsKey]){
            if(checkMatch){
                if(dsKey.indexOf(key) != 0) throw (key + " not in " + dsKey + " but should be!");
            } else {
                if(dsKey.indexOf(key) != -1) throw (key + " in " + dsKey + " but shouldn't be!");
            }
            return;
        }
    }
    throw(tritem + " not found.")
}

QUnit.begin(function( details ) {
  console.log( "Test amount:", details.totalTests );
});

QUnit.testStart(function( details ) {
  console.log( "Now running: ", details.module, details.name );
});
