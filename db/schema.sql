CREATE DATABASE beer_db;

USE beer_db;

CREATE TABLE beerTbl(
    id int auto_increment not null,
    name varchar(30),
    color int,
    hoppieness int, 
    style varchar(30),
    smell varchar(30),
    feel  varchar(30),
    triedThis Boolean,
    createdAT TIMESTAMP NOT NULL,
    primary key(id)
);

 	-- insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	-- VALUES ('NAME', colorint, ibu, 'type', 'smell', 'feel',false);

-- SEED DATA
  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis, createdAT) 
 	VALUES ('Pacific Wonderland Lager', 5, 40, 'lager', 'fruity', 'crisp', false, TIMESTAMP);

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Heady Topper', 3, 75, 'IPA', 'fruity', 'crisp',false, TIMESTAMP);

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Bass Pale Ale', 1, 32, 'Pale Ale ', 'Bready- malt', 'Clean', false, TIMESTAMP);

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('SummerTime', 1, 32, 'Kolsh', 'Mild Lemon', 'Light', false, TIMESTAMP);

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Edmund Fitzgerald', 10, 37, 'American Porter', ' Bitter Sweet Coffee', 'Dry', false, TIMESTAMP);

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Cinnsanity', 10, 35, 'Barleywine', 'cinnamon', 'warm', false, TIMESTAMP); 	
 
  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Imperial Pumpkin Ale', 10, 35, 'Pumpkin Ale ', 'Pumpkin', 'Sweet', false, TIMESTAMP); 	 	

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Corona', 1, 19, 'Lager', 'Mild Citrus', 'Clean', false, TIMESTAMP); 	
  
  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Red Devil', 6, 28, 'American Ale', 'Nuty', 'Full', false, TIMESTAMP); 	  

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Blue Moon Belgian White', 3, 10, 'Witbier', 'Citrus', 'Dry', false, TIMESTAMP); 

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Stella Artois', 1, 37, 'Pale Lager', 'mild malt', 'Crisp', false, TIMESTAMP);  	

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Leinenkugels Summer Shandy ', 2, 14, 'Shandy', 'Lemon', 'Crisp', false, TIMESTAMP); 	

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Samuel Adams Boston Lager', 2, 30, 'Lager', 'Caramel', 'Mild', false, TIMESTAMP); 	

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Farmhouse Ale ', 4, 0, 'Saison', 'Sour', 'Dry', false, TIMESTAMP);

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Founders Doom', 5, 100, 'IPA', 'Caramel', 'Medium', false, TIMESTAMP); 	

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Grandview Golden', 2, 0, 'American Blonde', 'Wheat - sweet', 'Light', false, TIMESTAMP);  	 	 		

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Black Walnut Wheat', 7, 18, 'Dark wheat Ale', 'Wheat - nutty', 'Light', false, TIMESTAMP);  	

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Smuttynose Old Brown Dog Ale', 5, 18, 'American Brown Ale', 'Toasted Nuts', 'Crisp', false, TIMESTAMP);

  insert into beerTbl(name, color, hoppieness, style, smell, feel, triedthis) 
 	VALUES ('Long Trail Ale', 2, 25, 'Altbier', 'Light Malt ', 'Light', false, TIMESTAMP);	
