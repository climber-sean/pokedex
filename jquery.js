$(document).ready(function() {
    
    // INITIAL AJAX CALL
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokedex/2/',
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function(response) {
            // For loop to create a list item for each pokemon
            for (i = 0; i < $(response.pokemon_entries).length; i++) {
                var name = response.pokemon_entries[i].pokemon_species.name;
                // Creates list element with correct classes, and value attribute which
                // represents the entry number
                var ele = $("<li></li>").addClass(name).addClass("list-item").attr("value", i+1).text(name);
                $(".poke-list").append(ele);
            }
            // For loop to bind a click event to each list item
            for (i = 0; i < $(response.pokemon_entries).length; i++) {
                var name = response.pokemon_entries[i].pokemon_species.name;
                $("." + name).click(function() {
                    
                    // Gets the value of attribute value to make call to correct API location
                    var value = $(this).attr("value");
                    $(".stat-list-item").remove();
                    $(".ability-list-item").remove();
                    $(".poke-sprite").remove();
                    /// BINDS AJAX CALL
                    $.ajax({
                        url: 'https://pokeapi.co/api/v2/pokemon/' + value + '/',
                        type: 'GET',
                        data: {
                            format: 'json'
                        },
                        success: function(response) {
                            console.log(response);
                            $(".pokemon-name").text(response.name);
                            $(".ability-height").text(response.height + "cm");
                            $(".ability-weight").text(response.weight / 10 + "kg");
                            
                            $(response.abilities).each(function() {
                                var name = this.ability.name;
                                console.log(name);
                                var ele = $("<li></li>").text(name).addClass("ability-list-item");
                                $(".ability-list").append(ele);
                            });
                            
                            $(".ability-exp").text(response.base_experience + "xp");
                            
                            $(response.stats).each(function() {
                                var name = this.stat.name;
                                var value = this.base_stat;
                                console.log(name);
                                var ele = $("<li></li>").text(name + '-' + value).addClass("stat-list-item");
                                $(".stat-list").append(ele);
                            });
                            
                            var ele = $("<img />").addClass("poke-sprite").attr("src", response.sprites.front_default);
                            var ele2 = $("<img />").addClass("poke-sprite").attr("src", response.sprites.back_default);
                            $(".sprite-container").append(ele).append(ele2);
                        },
                        error: function() {
                            console.log("error");
                        }
                    });
                    /// END OF AJAX CALL
                })
            }
            
            console.log(response.pokemon_entries[0].pokemon_species);
        },
        error: function() {
            console.log("error");
        }
    });
    /// END OF INITIAL AJAX CALL
    
    //
    // TEST API CALL LOG
    //
    
//    $.ajax({
//        url: 'https://pokeapi.co/api/v2/pokemon/1/',
//        type: 'GET',
//        data: {
//            format: 'json'
//        },
//        success: function(response) {
//            console.log(response);
//        },
//        error: function() {
//            console.log("error");
//        }
//    });
    
});