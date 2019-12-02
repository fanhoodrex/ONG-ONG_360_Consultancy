OANDA.Locale.prototype.strings = {};
OANDA.Locale.prototype.strings["en"] = {
    'bidAskSubtitle': '[_1] for the 24-hour period ending',
    'bidAskSell1': 'Sell 1 [_1]',
    'bidAskBuy1': 'Buy 1 [_1]',
    'chartSubtitle': '[_1] average daily bid prices',
    'spreadDetails': '[_1] Details',
    'spreadSubtitle': '[_1]/[_2] for the 24-hour period ending <span class="date">[_3]</span> [_4] @ [_5]',
    'spreadBuying': 'Buying [_1]',
    'spreadSelling': 'Selling [_1]',
    'spreadYouPay': 'you pay [_1]',
    'spreadYouGet': 'you get [_1]',
    'spreadEstimated': 'Estimated price based on daily [_1] rates',
    'searchHelp': 'Type to search...',
    'mruLabel': 'Favorites',
    'noData': 'Warning: [_1]/[_2] exchange rates not available for [_3]',
    'curToCur': '[_1]/[_2]'
};

var cache = {
    "currency_list": [{
        "search": "",
        "label": "yes",
        "display": "A"
    }, {
        "search": "AFN,Afghanistan,Afghanistan Afghani,Ø‹",
        "value": "AFN",
        "display": "Afghanistan Afghani"
    }, {
        "search": "AFA,Afghanistan,Afghanistan Afghani*,Ø‹",
        "value": "AFA",
        "display": "Afghanistan Afghani*"
    }, {
        "search": "ALL,Albania,Albanian Lek",
        "value": "ALL",
        "display": "Albanian Lek"
    }, {
        "search": "DZD,Algeria,Algerian Dinar,Ø¯Ø¬,DA",
        "value": "DZD",
        "display": "Algerian Dinar"
    }, {
        "search": "ADF,Andorra,Andorran Franc*,â‚£,FF",
        "value": "ADF",
        "display": "Andorran Franc*"
    }, {
        "search": "ADP,Andorra,Andorran Peseta*,pts,â‚§",
        "value": "ADP",
        "display": "Andorran Peseta*"
    }, {
        "search": "AOA,Angola,Angolan Kwanza,Kz",
        "value": "AOA",
        "display": "Angolan Kwanza"
    }, {
        "search": "AON,Angola,Angolan Old Kwanza*,Kz",
        "value": "AON",
        "display": "Angolan Old Kwanza*"
    }, {
        "search": "ARS,Argentina,Argentine Peso,$",
        "value": "ARS",
        "display": "Argentine Peso"
    }, {
        "search": "AMD,Armenia,Armenian Dram,Õ¤Ö€.",
        "value": "AMD",
        "display": "Armenian Dram"
    }, {
        "search": "AWG,Aruba,Aruban Florin,AÆ’",
        "value": "AWG",
        "display": "Aruban Florin"
    }, {
        "search": "AUD,Australia,Cocos Islands,Keeling Islands,Christmas Island,Heard and McDonald Islands,Kiribati,Norfolk Island,Nauru,Tuvalu,Australian Dollar,A$",
        "value": "AUD",
        "display": "Australian Dollar"
    }, {
        "search": "ATS,Austria,Austrian Schilling*,Ã¶S",
        "value": "ATS",
        "display": "Austrian Schilling*"
    }, {
        "search": "AZN,Azerbaijan,Azerbaijan New Manat,man.",
        "value": "AZN",
        "display": "Azerbaijan New Manat"
    }, {
        "search": "AZM,Azerbaijan,Azerbaijan Old Manat*,man.",
        "value": "AZM",
        "display": "Azerbaijan Old Manat*"
    }, {
        "search": "",
        "label": "yes",
        "display": "B"
    }, {
        "search": "BSD,Bahamas,Bahamian Dollar,B$",
        "value": "BSD",
        "display": "Bahamian Dollar"
    }, {
        "search": "BHD,Bahrain,Bahraini Dinar,.Ø¯.Ø¨,BD",
        "value": "BHD",
        "display": "Bahraini Dinar"
    }, {
        "search": "BDT,Bangladesh,Bangladeshi Taka,à§³",
        "value": "BDT",
        "display": "Bangladeshi Taka"
    }, {
        "search": "BBD,Barbados,Barbados Dollar,Bds$",
        "value": "BBD",
        "display": "Barbados Dollar"
    }, {
        "search": "BYR,Belarus,Belarusian Old Ruble*,Br",
        "value": "BYR",
        "display": "Belarusian Old Ruble*"
    }, {
        "search": "BYN,Belarus,Belarusian Ruble,Br",
        "value": "BYN",
        "display": "Belarusian Ruble"
    }, {
        "search": "BEF,Belgium,Belgian Franc*,fr.",
        "value": "BEF",
        "display": "Belgian Franc*"
    }, {
        "search": "BZD,Belize,Belize Dollar,BZ$",
        "value": "BZD",
        "display": "Belize Dollar"
    }, {
        "search": "BMD,Bermuda,Bermudian Dollar,BD$",
        "value": "BMD",
        "display": "Bermudian Dollar"
    }, {
        "search": "BTN,Bhutan,Bhutan Ngultrum,Nu.",
        "value": "BTN",
        "display": "Bhutan Ngultrum"
    }, {
        "search": "XBT,,Bitcoin",
        "value": "XBT",
        "display": "Bitcoin"
    }, {
        "search": "BTC,,Bitcoin",
        "value": "BTC",
        "display": "Bitcoin"
    }, {
        "search": "BOB,Bolivia,Bolivian Boliviano,Bs.",
        "value": "BOB",
        "display": "Bolivian Boliviano"
    }, {
        "search": "BAM,Bosnia and Herzegovina,Bosnian Mark,KM",
        "value": "BAM",
        "display": "Bosnian Mark"
    }, {
        "search": "BWP,Botswana,Botswana Pula",
        "value": "BWP",
        "display": "Botswana Pula"
    }, {
        "search": "BRL,Brazil,Brazilian Real,R$",
        "value": "BRL",
        "display": "Brazilian Real"
    }, {
        "search": "GBP,England,Britain,UK,United Kingdom,Great Britain,British Pound,Â£,quid,sterling",
        "value": "GBP",
        "display": "British Pound"
    }, {
        "search": "BND,Brunei Darussalam,Brunei Dollar,B$",
        "value": "BND",
        "display": "Brunei Dollar"
    }, {
        "search": "BGN,Bulgaria,Bulgarian Lev,Ð»Ð²",
        "value": "BGN",
        "display": "Bulgarian Lev"
    }, {
        "search": "BGL,Bulgaria,Bulgarian Old Lev,Ð»Ð²",
        "value": "BGL",
        "display": "Bulgarian Old Lev"
    }, {
        "search": "BIF,Burundi,Burundi Franc,FBu",
        "value": "BIF",
        "display": "Burundi Franc"
    }, {
        "search": "",
        "label": "yes",
        "display": "C"
    }, {
        "search": "KHR,Cambodia,Cambodian Riel,áŸ›",
        "value": "KHR",
        "display": "Cambodian Riel"
    }, {
        "search": "CAD,Canada,Canadian Dollar,C$,buck,loonie,huard,piastre",
        "value": "CAD",
        "display": "Canadian Dollar"
    }, {
        "search": "CVE,Cape Verde,Cape Verde Escudo,$",
        "value": "CVE",
        "display": "Cape Verde Escudo"
    }, {
        "search": "KYD,Cayman Islands,Cayman Islands Dollar,CI$",
        "value": "KYD",
        "display": "Cayman Islands Dollar"
    }, {
        "search": "CFP,,Central Pacific Franc",
        "value": "CFP",
        "display": "Central Pacific Franc"
    }, {
        "search": "XOF,Benin,Burkina Faso,CÃ´te D'Ivoire,Cote D'Ivoire,Guinea-Bissau,Mali,Niger,Senegal,Togo,CFA Franc BCEAO,CFA",
        "value": "XOF",
        "display": "CFA Franc BCEAO"
    }, {
        "search": "XAF,Central African Republic,Cameroon,Congo,Gabon,Equatorial Guinea,Chad,CFA Franc BEAC,FCFA",
        "value": "XAF",
        "display": "CFA Franc BEAC"
    }, {
        "search": "XPF,New Caledonia,French Polynesia,Wallis and Futuna,CFP Franc",
        "value": "XPF",
        "display": "CFP Franc"
    }, {
        "search": "CLP,Chile,Chilean Peso,$",
        "value": "CLP",
        "display": "Chilean Peso"
    }, {
        "search": "CNY,China,Chinese Yuan Renminbi,Â¥",
        "value": "CNY",
        "display": "Chinese Yuan Renminbi"
    }, {
        "search": "CNH,,Chinese Yuan Renminbi (offshore)",
        "value": "CNH",
        "display": "Chinese Yuan Renminbi (offshore)"
    }, {
        "search": "COP,Colombia,Colombian Peso,$",
        "value": "COP",
        "display": "Colombian Peso"
    }, {
        "search": "KMF,Comoros,Comoros Franc,CF",
        "value": "KMF",
        "display": "Comoros Franc"
    }, {
        "search": "CDF,The Democratic Republic Of The Congo,Zaire,Congolese Franc",
        "value": "CDF",
        "display": "Congolese Franc"
    }, {
        "search": "CRC,Costa Rica,Costa Rican Colon,â‚¡",
        "value": "CRC",
        "display": "Costa Rican Colon"
    }, {
        "search": "HRK,Croatia,Croatian Kuna,kn",
        "value": "HRK",
        "display": "Croatian Kuna"
    }, {
        "search": "CUC,,Cuban Convertible Peso,CUC$,chavito",
        "value": "CUC",
        "display": "Cuban Convertible Peso"
    }, {
        "search": "CUP,Cuba,Cuban Peso,$MN",
        "value": "CUP",
        "display": "Cuban Peso"
    }, {
        "search": "CYP,Cyprus,Cyprus Pound*,Â£",
        "value": "CYP",
        "display": "Cyprus Pound*"
    }, {
        "search": "CZK,Czech Republic,Czech Koruna,KÄ",
        "value": "CZK",
        "display": "Czech Koruna"
    }, {
        "search": "CSK,Czechoslovakia,Czechoslovak Socialist Republic,Czechoslovak Koruna*,KÄs",
        "value": "CSK",
        "display": "Czechoslovak Koruna*"
    }, {
        "search": "",
        "label": "yes",
        "display": "D"
    }, {
        "search": "DKK,Denmark,Faroe Islands,Greenland,Danish Krone,kr",
        "value": "DKK",
        "display": "Danish Krone"
    }, {
        "search": "DJF,Djibouti,Djibouti Franc,Fdj",
        "value": "DJF",
        "display": "Djibouti Franc"
    }, {
        "search": "DOP,Dominican Republic,Dominican R. Peso,RD$",
        "value": "DOP",
        "display": "Dominican R. Peso"
    }, {
        "search": "NLG,Netherlands,Dutch Guilder*,Æ’,fl",
        "value": "NLG",
        "display": "Dutch Guilder*"
    }, {
        "search": "",
        "label": "yes",
        "display": "E"
    }, {
        "search": "XCD,Anguilla,Antigua and Barbuda,Dominica,Grenada,Saint Kitts And Nevis,Saint Lucia,Montserrat,Saint Vincent And The Grenedines,East Caribbean Dollar,EC$",
        "value": "XCD",
        "display": "East Caribbean Dollar"
    }, {
        "search": "XEU,,ECU*,â‚ ",
        "value": "XEU",
        "display": "ECU*"
    }, {
        "search": "ECS,Ecuador,Ecuador Sucre*,S/.",
        "value": "ECS",
        "display": "Ecuador Sucre*"
    }, {
        "search": "EGP,Egypt,Egyptian Pound,EÂ£",
        "value": "EGP",
        "display": "Egyptian Pound"
    }, {
        "search": "SVC,El Salvador,El Salvador Colon*,â‚¡",
        "value": "SVC",
        "display": "El Salvador Colon*"
    }, {
        "search": "ERN,Eritrea,Eritrean Nakfa",
        "value": "ERN",
        "display": "Eritrean Nakfa"
    }, {
        "search": "EEK,Estonia,Estonian Kroon*,kr",
        "value": "EEK",
        "display": "Estonian Kroon*"
    }, {
        "search": "ETH,,Ethereum",
        "value": "ETH",
        "display": "Ethereum"
    }, {
        "search": "ETB,Ethiopia,Ethiopian Birr,Br",
        "value": "ETB",
        "display": "Ethiopian Birr"
    }, {
        "search": "EUR,Andorra,French Southern Territories,Austria,Belgium,Cyprus,Germany,Spain,Finland,France,Guadeloupe,Greece,French Guiana,Ireland,Italy,Kosovo,Luxembourg,Monaco,Malta,Montenegro,Martinique,Mayotte,Netherlands,Portugal,Reunion,RÃ©union,San Marino,Saint Pierre And Miquelon,Slovakia,Slovenia,Holy See,Vatican,Euro,â‚¬",
        "value": "EUR",
        "display": "Euro"
    }, {
        "search": "",
        "label": "yes",
        "display": "F"
    }, {
        "search": "FKP,Falkland Islands,Malvinas,Falkland Islands Pound,Â£",
        "value": "FKP",
        "display": "Falkland Islands Pound"
    }, {
        "search": "FJD,Fiji,Fiji Dollar,FJ$",
        "value": "FJD",
        "display": "Fiji Dollar"
    }, {
        "search": "FIM,Finland,Finnish Markka*,mk",
        "value": "FIM",
        "display": "Finnish Markka*"
    }, {
        "search": "FRF,France,French Franc*,â‚£,FF",
        "value": "FRF",
        "display": "French Franc*"
    }, {
        "search": "",
        "label": "yes",
        "display": "G"
    }, {
        "search": "GMD,Gambia,Gambian Dalasi",
        "value": "GMD",
        "display": "Gambian Dalasi"
    }, {
        "search": "GEL,Georgia,Georgian Lari",
        "value": "GEL",
        "display": "Georgian Lari"
    }, {
        "search": "DEM,Germany,German Mark*,â„³,DM,pf",
        "value": "DEM",
        "display": "German Mark*"
    }, {
        "search": "GHC,Ghana,Ghanaian Cedi*,GHâ‚µ",
        "value": "GHC",
        "display": "Ghanaian Cedi*"
    }, {
        "search": "GHS,Ghana,Ghanaian New Cedi,GHâ‚µ",
        "value": "GHS",
        "display": "Ghanaian New Cedi"
    }, {
        "search": "GIP,Gibraltar,Gibraltar Pound,Â£",
        "value": "GIP",
        "display": "Gibraltar Pound"
    }, {
        "search": "XAU,,Gold (oz.)",
        "value": "XAU",
        "display": "Gold (oz.)"
    }, {
        "search": "GRD,Greece,Greek Drachma*,â‚¯",
        "value": "GRD",
        "display": "Greek Drachma*"
    }, {
        "search": "GTQ,Guatemala,Guatemalan Quetzal",
        "value": "GTQ",
        "display": "Guatemalan Quetzal"
    }, {
        "search": "GNF,Guinea,Guinea Franc,FG,GFr",
        "value": "GNF",
        "display": "Guinea Franc"
    }, {
        "search": "GYD,Guyana,Guyanese Dollar,$",
        "value": "GYD",
        "display": "Guyanese Dollar"
    }, {
        "search": "",
        "label": "yes",
        "display": "H"
    }, {
        "search": "HTG,Haiti,Haitian Gourde,G",
        "value": "HTG",
        "display": "Haitian Gourde"
    }, {
        "search": "HNL,Honduras,Honduran Lempira",
        "value": "HNL",
        "display": "Honduran Lempira"
    }, {
        "search": "HKD,Hong Kong,Hong Kong Dollar,HK$",
        "value": "HKD",
        "display": "Hong Kong Dollar"
    }, {
        "search": "HUF,Hungary,Hungarian Forint,Ft",
        "value": "HUF",
        "display": "Hungarian Forint"
    }, {
        "search": "",
        "label": "yes",
        "display": "I"
    }, {
        "search": "ISK,Iceland,Iceland Krona,kr,kall",
        "value": "ISK",
        "display": "Iceland Krona"
    }, {
        "search": "INR,Bhutan,India,Indian Rupee,â‚¨,Rs.",
        "value": "INR",
        "display": "Indian Rupee"
    }, {
        "search": "IDR,Indonesia,Indonesian Rupiah,Rp",
        "value": "IDR",
        "display": "Indonesian Rupiah"
    }, {
        "search": "IRR,Islamic Republic Of Iran,Iranian Rial,Ø±ÛŒØ§Ù„",
        "value": "IRR",
        "display": "Iranian Rial"
    }, {
        "search": "IQD,Iraq,Iraqi Dinar,Ø¹.Ø¯",
        "value": "IQD",
        "display": "Iraqi Dinar"
    }, {
        "search": "IEP,Ireland,Irish Punt*,Â£,quid",
        "value": "IEP",
        "display": "Irish Punt*"
    }, {
        "search": "ILS,Israel,Israeli New Shekel,â‚ª",
        "value": "ILS",
        "display": "Israeli New Shekel"
    }, {
        "search": "ITL,Italy,Italian Lira*,â‚¤",
        "value": "ITL",
        "display": "Italian Lira*"
    }, {
        "search": "",
        "label": "yes",
        "display": "J"
    }, {
        "search": "JMD,Jamaica,Jamaican Dollar,J$",
        "value": "JMD",
        "display": "Jamaican Dollar"
    }, {
        "search": "JPY,Japan,Japanese Yen,Â¥",
        "value": "JPY",
        "display": "Japanese Yen"
    }, {
        "search": "JOD,Jordan,Jordanian Dinar",
        "value": "JOD",
        "display": "Jordanian Dinar"
    }, {
        "search": "",
        "label": "yes",
        "display": "K"
    }, {
        "search": "KZT,Kazakhstan,Kazakhstan Tenge,ã€’",
        "value": "KZT",
        "display": "Kazakhstan Tenge"
    }, {
        "search": "KES,Kenya,Kenyan Shilling,KSh",
        "value": "KES",
        "display": "Kenyan Shilling"
    }, {
        "search": "KWD,Kuwait,Kuwaiti Dinar,Ø¯.Ùƒ",
        "value": "KWD",
        "display": "Kuwaiti Dinar"
    }, {
        "search": "KGS,Kyrgyzstan,Kyrgyzstanian Som",
        "value": "KGS",
        "display": "Kyrgyzstanian Som"
    }, {
        "search": "",
        "label": "yes",
        "display": "L"
    }, {
        "search": "LAK,Laos,Lao People's Democratic Republic,Lao Kip,â‚­N",
        "value": "LAK",
        "display": "Lao Kip"
    }, {
        "search": "LVL,Latvia,Latvian Lats*,Ls",
        "value": "LVL",
        "display": "Latvian Lats*"
    }, {
        "search": "LBP,Lebanon,Lebanese Pound,Ù„.Ù„",
        "value": "LBP",
        "display": "Lebanese Pound"
    }, {
        "search": "LSL,Lesotho,Lesotho Loti",
        "value": "LSL",
        "display": "Lesotho Loti"
    }, {
        "search": "LRD,Liberia,Liberian Dollar,L$",
        "value": "LRD",
        "display": "Liberian Dollar"
    }, {
        "search": "LYD,Libya,Libyan Dinar,Ù„.Ø¯,LD",
        "value": "LYD",
        "display": "Libyan Dinar"
    }, {
        "search": "LTC,,Litecoin",
        "value": "LTC",
        "display": "Litecoin"
    }, {
        "search": "LTL,Lithuania,Lithuanian Litas*",
        "value": "LTL",
        "display": "Lithuanian Litas*"
    }, {
        "search": "LUF,Luxembourg,Luxembourg Franc*,fr.",
        "value": "LUF",
        "display": "Luxembourg Franc*"
    }, {
        "search": "",
        "label": "yes",
        "display": "M"
    }, {
        "search": "MOP,Macao,Macau Pataca,MOP$",
        "value": "MOP",
        "display": "Macau Pataca"
    }, {
        "search": "MKD,The Former Yugoslav Republic Of Macedonia,Macedonian Denar,Ð´ÐµÐ½",
        "value": "MKD",
        "display": "Macedonian Denar"
    }, {
        "search": "MGA,Madagascar,Malagasy Ariary",
        "value": "MGA",
        "display": "Malagasy Ariary"
    }, {
        "search": "MGF,Madagascar,Malagasy Franc*",
        "value": "MGF",
        "display": "Malagasy Franc*"
    }, {
        "search": "MWK,Malawi,Malawi Kwacha,MK",
        "value": "MWK",
        "display": "Malawi Kwacha"
    }, {
        "search": "MYR,Malaysia,Malaysian Ringgit,RM",
        "value": "MYR",
        "display": "Malaysian Ringgit"
    }, {
        "search": "MVR,Maldives,Maldive Rufiyaa,Rf,.Þƒ",
        "value": "MVR",
        "display": "Maldive Rufiyaa"
    }, {
        "search": "MTL,Malta,Maltese Lira*,â‚¤",
        "value": "MTL",
        "display": "Maltese Lira*"
    }, {
        "search": "MRO,Mauritania,Mauritanian Old Ouguiya*,UM",
        "value": "MRO",
        "display": "Mauritanian Old Ouguiya*"
    }, {
        "search": "MRU,Mauritania,Mauritanian Ouguiya,UM",
        "value": "MRU",
        "display": "Mauritanian Ouguiya"
    }, {
        "search": "MUR,Mauritius,Mauritius Rupee",
        "value": "MUR",
        "display": "Mauritius Rupee"
    }, {
        "search": "MXP,Mexico,Mexican Old Peso",
        "value": "MXP",
        "display": "Mexican Old Peso"
    }, {
        "search": "MXN,Mexico,Mexican Peso,Mex$,varos",
        "value": "MXN",
        "display": "Mexican Peso"
    }, {
        "search": "MDL,Moldova,Moldovan Leu",
        "value": "MDL",
        "display": "Moldovan Leu"
    }, {
        "search": "MNT,Mongolia,Mongolian Tugrik,â‚®",
        "value": "MNT",
        "display": "Mongolian Tugrik"
    }, {
        "search": "MAD,Western Sahara,Morocco,Moroccan Dirham,Ø¯.Ù….",
        "value": "MAD",
        "display": "Moroccan Dirham"
    }, {
        "search": "MZM,Mozambique,Mozambique Metical*,MTn",
        "value": "MZM",
        "display": "Mozambique Metical*"
    }, {
        "search": "MZN,Mozambique,Mozambique New Metical,MTn",
        "value": "MZN",
        "display": "Mozambique New Metical"
    }, {
        "search": "MMK,Myanmar,Burma,Myanmar Kyat",
        "value": "MMK",
        "display": "Myanmar Kyat"
    }, {
        "search": "",
        "label": "yes",
        "display": "N"
    }, {
        "search": "NAD,Namibia,Namibia Dollar,N$",
        "value": "NAD",
        "display": "Namibia Dollar"
    }, {
        "search": "NPR,Nepal,Nepalese Rupee,à¤°à¥‚,â‚¨,Rs.",
        "value": "NPR",
        "display": "Nepalese Rupee"
    }, {
        "search": "NZD,Cook Islands,Niue,New Zealand,Pitcairn,Tokelau,New Zealand Dollar,NZ$,kiwi",
        "value": "NZD",
        "display": "New Zealand Dollar"
    }, {
        "search": "NIO,Nicaragua,Nicaraguan Cordoba Oro,C$",
        "value": "NIO",
        "display": "Nicaraguan Cordoba Oro"
    }, {
        "search": "NGN,Nigeria,Nigerian Naira,â‚¦",
        "value": "NGN",
        "display": "Nigerian Naira"
    }, {
        "search": "ANG,Netherlands Antilles,NL Antillian Guilder,NAÆ’",
        "value": "ANG",
        "display": "NL Antillian Guilder"
    }, {
        "search": "KPW,North Korea,Democratic People's Republic Of Korea,North Korean Won,â‚©",
        "value": "KPW",
        "display": "North Korean Won"
    }, {
        "search": "NOK,Bouvet Island,Norway,Svalbard And Jan Mayen,Norwegian Kroner,kr",
        "value": "NOK",
        "display": "Norwegian Kroner"
    }, {
        "search": "",
        "label": "yes",
        "display": "O"
    }, {
        "search": "OMR,Oman,Omani Rial,Ø±.Ø¹.",
        "value": "OMR",
        "display": "Omani Rial"
    }, {
        "search": "",
        "label": "yes",
        "display": "P"
    }, {
        "search": "PKR,Pakistan,Pakistan Rupee,â‚¨,Rs.",
        "value": "PKR",
        "display": "Pakistan Rupee"
    }, {
        "search": "XPD,,Palladium (oz.)",
        "value": "XPD",
        "display": "Palladium (oz.)"
    }, {
        "search": "PAB,Panama,Panamanian Balboa,B/.",
        "value": "PAB",
        "display": "Panamanian Balboa"
    }, {
        "search": "PGK,Papua New Guinea,Papua New Guinea Kina",
        "value": "PGK",
        "display": "Papua New Guinea Kina"
    }, {
        "search": "PYG,Paraguay,Paraguay Guarani,â‚²",
        "value": "PYG",
        "display": "Paraguay Guarani"
    }, {
        "search": "PEN,Peru,Peruvian Nuevo Sol,S/.",
        "value": "PEN",
        "display": "Peruvian Nuevo Sol"
    }, {
        "search": "PHP,Philippines,Philippine Peso,â‚±",
        "value": "PHP",
        "display": "Philippine Peso"
    }, {
        "search": "XPT,,Platinum (oz.)",
        "value": "XPT",
        "display": "Platinum (oz.)"
    }, {
        "search": "PLZ,Poland,Polish Old Zloty",
        "value": "PLZ",
        "display": "Polish Old Zloty"
    }, {
        "search": "PLN,Poland,Polish Zloty,zÅ‚",
        "value": "PLN",
        "display": "Polish Zloty"
    }, {
        "search": "PTE,Portugal,Portuguese Escudo*,$",
        "value": "PTE",
        "display": "Portuguese Escudo*"
    }, {
        "search": "",
        "label": "yes",
        "display": "Q"
    }, {
        "search": "QAR,Qatar,Qatari Rial,QR,Ø±.Ù‚",
        "value": "QAR",
        "display": "Qatari Rial"
    }, {
        "search": "",
        "label": "yes",
        "display": "R"
    }, {
        "search": "ROL,Romania,Romanian Lei*",
        "value": "ROL",
        "display": "Romanian Lei*"
    }, {
        "search": "RON,Romania,Romanian New Lei",
        "value": "RON",
        "display": "Romanian New Lei"
    }, {
        "search": "RUB,Russian Federation,Russian Rouble,Ñ€ÑƒÐ±.,Ñ€.",
        "value": "RUB",
        "display": "Russian Rouble"
    }, {
        "search": "RWF,Rwanda,Rwandan Franc,RF",
        "value": "RWF",
        "display": "Rwandan Franc"
    }, {
        "search": "",
        "label": "yes",
        "display": "S"
    }, {
        "search": "WST,Samoa,Samoan Tala,WS$",
        "value": "WST",
        "display": "Samoan Tala"
    }, {
        "search": "STN,Sao Tome and Principe,Sao Tome/Principe Dobra,Db",
        "value": "STN",
        "display": "Sao Tome/Principe Dobra"
    }, {
        "search": "STD,Sao Tome and Principe,Sao Tome/Principe Old Dobra*,Db",
        "value": "STD",
        "display": "Sao Tome/Principe Old Dobra*"
    }, {
        "search": "SAR,Saudi Arabia,Saudi Riyal,SR,Ø±.Ø³",
        "value": "SAR",
        "display": "Saudi Riyal"
    }, {
        "search": "RSD,Serbia,Serbian Dinar,Ð Ð¡Ð”",
        "value": "RSD",
        "display": "Serbian Dinar"
    }, {
        "search": "CSD,Serbia,Serbian Old Dinar",
        "value": "CSD",
        "display": "Serbian Old Dinar"
    }, {
        "search": "SCR,Seychelles,Seychelles Rupee,SRe",
        "value": "SCR",
        "display": "Seychelles Rupee"
    }, {
        "search": "SLL,Sierra Leone,Sierra Leone Leone,Le",
        "value": "SLL",
        "display": "Sierra Leone Leone"
    }, {
        "search": "XAG,,Silver (oz.)",
        "value": "XAG",
        "display": "Silver (oz.)"
    }, {
        "search": "SGD,Singapore,Singapore Dollar,S$",
        "value": "SGD",
        "display": "Singapore Dollar"
    }, {
        "search": "SKK,Slovakia,Slovak Koruna*,Sk",
        "value": "SKK",
        "display": "Slovak Koruna*"
    }, {
        "search": "SIT,Slovenia,Slovenian Tolar*",
        "value": "SIT",
        "display": "Slovenian Tolar*"
    }, {
        "search": "SBD,Solomon Islands,Solomon Islands Dollar,SI$",
        "value": "SBD",
        "display": "Solomon Islands Dollar"
    }, {
        "search": "SOS,Somalia,Somali Shilling",
        "value": "SOS",
        "display": "Somali Shilling"
    }, {
        "search": "ZAR,Lesotho,Namibia,South Africa,South African Rand",
        "value": "ZAR",
        "display": "South African Rand"
    }, {
        "search": "KRW,South Korea,Republic of Korea,South-Korean Won,â‚©",
        "value": "KRW",
        "display": "South-Korean Won"
    }, {
        "search": "ESP,Spain,Spanish Peseta*,pts,â‚§",
        "value": "ESP",
        "display": "Spanish Peseta*"
    }, {
        "search": "LKR,Sri Lanka,Sri Lanka Rupee,â‚¨,Rs.",
        "value": "LKR",
        "display": "Sri Lanka Rupee"
    }, {
        "search": "SHP,Saint Helena,St. Helena Pound,Â£",
        "value": "SHP",
        "display": "St. Helena Pound"
    }, {
        "search": "SDD,Sudan,Sudanese Dinar*",
        "value": "SDD",
        "display": "Sudanese Dinar*"
    }, {
        "search": "SDP,Sudan,Sudanese Old Pound*",
        "value": "SDP",
        "display": "Sudanese Old Pound*"
    }, {
        "search": "SDG,Sudan,Sudanese Pound",
        "value": "SDG",
        "display": "Sudanese Pound"
    }, {
        "search": "SRD,Suriname,Suriname Dollar,$",
        "value": "SRD",
        "display": "Suriname Dollar"
    }, {
        "search": "SRG,Suriname,Suriname Guilder*,Æ’,fl",
        "value": "SRG",
        "display": "Suriname Guilder*"
    }, {
        "search": "SZL,Swaziland,Swaziland Lilangeni",
        "value": "SZL",
        "display": "Swaziland Lilangeni"
    }, {
        "search": "SEK,Sweden,Swedish Krona,kr,spÃ¤nn",
        "value": "SEK",
        "display": "Swedish Krona"
    }, {
        "search": "CHF,Switzerland,Liechtenstein,Swiss Franc,Sâ‚£",
        "value": "CHF",
        "display": "Swiss Franc"
    }, {
        "search": "SYP,Syrian Arab Republic,Syrian Pound",
        "value": "SYP",
        "display": "Syrian Pound"
    }, {
        "search": "",
        "label": "yes",
        "display": "T"
    }, {
        "search": "TWD,Taiwan,Taiwan Dollar,NT$",
        "value": "TWD",
        "display": "Taiwan Dollar"
    }, {
        "search": "TJS,Tajikistan,Tajikistani Somoni",
        "value": "TJS",
        "display": "Tajikistani Somoni"
    }, {
        "search": "TZS,United Republic of Tanzania,Tanzanian Shilling",
        "value": "TZS",
        "display": "Tanzanian Shilling"
    }, {
        "search": "THB,Thailand,Thai Baht,à¸¿",
        "value": "THB",
        "display": "Thai Baht"
    }, {
        "search": "TOP,Tonga,Tonga Pa'anga,T$",
        "value": "TOP",
        "display": "Tonga Pa'anga"
    }, {
        "search": "TTD,Trinidad and Tobago,Trinidad/Tobago Dollar,TT$",
        "value": "TTD",
        "display": "Trinidad/Tobago Dollar"
    }, {
        "search": "TND,Tunisia,Tunisian Dinar,Ø¯.Øª,DT",
        "value": "TND",
        "display": "Tunisian Dinar"
    }, {
        "search": "TRY,Turkey,Turkish Lira,TL",
        "value": "TRY",
        "display": "Turkish Lira"
    }, {
        "search": "TRL,Turkey,Turkish Old Lira*,TL",
        "value": "TRL",
        "display": "Turkish Old Lira*"
    }, {
        "search": "TMM,Turkmenistan,Turkmenistan Manat*,m",
        "value": "TMM",
        "display": "Turkmenistan Manat*"
    }, {
        "search": "TMT,Turkmenistan,Turkmenistan New Manat,m",
        "value": "TMT",
        "display": "Turkmenistan New Manat"
    }, {
        "search": "",
        "label": "yes",
        "display": "U"
    }, {
        "search": "UGX,Uganda,Uganda Shilling,USh",
        "value": "UGX",
        "display": "Uganda Shilling"
    }, {
        "search": "UGS,Uganda,Uganga Old Shilling",
        "value": "UGS",
        "display": "Uganga Old Shilling"
    }, {
        "search": "UAH,Ukraine,Ukraine Hryvnia,â‚´",
        "value": "UAH",
        "display": "Ukraine Hryvnia"
    }, {
        "search": "UYP,,Uruguayan Old Peso",
        "value": "UYP",
        "display": "Uruguayan Old Peso"
    }, {
        "search": "UYU,Uruguay,Uruguayan Peso,$",
        "value": "UYU",
        "display": "Uruguayan Peso"
    }, {
        "search": "USD,American Samoa,Ecuador,Federated States Of Micronesia,Guam,British Indian Ocean Territory,Marshall Islands,Northern Mariana Islands,Panama,Palau,Puerto Rico,El Salvador,Turks and Caicos Islands,Timor-Leste,East Timor,United States Minor Outlying Islands,United States,US,America,British Virgin Islands,US Virgin Islands,US Dollar,$,buck,greenback",
        "value": "USD",
        "display": "US Dollar"
    }, {
        "search": "AED,United Arab Emirates,UAE,Dubai,Abu Dhabi,Utd. Arab Emir. Dirham,Ø¯.Ø¥",
        "value": "AED",
        "display": "Utd. Arab Emir. Dirham"
    }, {
        "search": "UZS,Uzbekistan,Uzbekistan Som",
        "value": "UZS",
        "display": "Uzbekistan Som"
    }, {
        "search": "",
        "label": "yes",
        "display": "V"
    }, {
        "search": "VUV,Vanuatu,Vanuatu Vatu,Vt",
        "value": "VUV",
        "display": "Vanuatu Vatu"
    }, {
        "search": "VEF,Venezuela,Venezuelan Bolivar Fuerte,Bs.F",
        "value": "VEF",
        "display": "Venezuelan Bolivar Fuerte"
    }, {
        "search": "VES,,Venezuelan Bolivar Soberano",
        "value": "VES",
        "display": "Venezuelan Bolivar Soberano"
    }, {
        "search": "VEB,Venezuela,Venezuelan Bolivar*,Bs.F",
        "value": "VEB",
        "display": "Venezuelan Bolivar*"
    }, {
        "search": "VND,Vietnam,Vietnamese Dong,â‚«",
        "value": "VND",
        "display": "Vietnamese Dong"
    }, {
        "search": "",
        "label": "yes",
        "display": "Y"
    }, {
        "search": "YER,Yemen,Yemeni Rial",
        "value": "YER",
        "display": "Yemeni Rial"
    }, {
        "search": "YUN,,Yugoslav Dinar*,Ð´Ð¸Ð½",
        "value": "YUN",
        "display": "Yugoslav Dinar*"
    }, {
        "search": "",
        "label": "yes",
        "display": "Z"
    }, {
        "search": "ZMW,,Zambian Kwacha",
        "value": "ZMW",
        "display": "Zambian Kwacha"
    }, {
        "search": "ZMK,Zambia,Zambian Kwacha*,ZK",
        "value": "ZMK",
        "display": "Zambian Kwacha*"
    }, {
        "search": "ZWL,,Zimbabwe Dollar",
        "value": "ZWL",
        "display": "Zimbabwe Dollar"
    }, {
        "search": "ZWD,Zimbabwe,Zimbabwe Dollar*,Z$",
        "value": "ZWD",
        "display": "Zimbabwe Dollar*"
    }],
    "rates_list": [{
        "value": 0,
        "display": "+/- 0%"
    }, {
        "value": 1,
        "display": "+/- 1%"
    }, {
        "value": 2,
        "display": "+/- 2% (Typical ATM rate)"
    }, {
        "value": 3,
        "display": "+/- 3% (Typical Credit Card rate)"
    }, {
        "value": 4,
        "display": "+/- 4%"
    }, {
        "value": 5,
        "display": "+/- 5% (Typical Kiosk rate)"
    }],
    "currency_annotation_list": {
        "4": {
            "CURRENCIES": ["ZMK"],
            "MESSAGE": "Warning: On January 1, 2013 the ZMK  was rebased to the ZMW (1000 ZMK = 1 ZMW). ZMK will no longer be legal tender on June 13, 2013."
        },
        "1": {
            "CURRENCIES": ["ADF", "ADP", "ATS", "BEF", "CYP", "DEM", "ESP", "EEK", "FIM", "FRF", "GRD", "IEP", "ITL", "LTL", "LUF", "LVL", "MTL", "NLG", "PTE", "SIT", "SKK", "XEU"],
            "MESSAGE": "Warning: [_1] [_2] is replaced by the Euro.  <a href=\"/site/euro.shtml\">Read more about the Euro.</a>"
        },
        "3": {
            "CURRENCIES": ["IQD"],
            "MESSAGE": "<a href=\"/site/currencies/new_iraqi_dinar.shtml\">Learn about the new Iraqi Dinar.</a>"
        },
        "2": {
            "CURRENCIES": ["AFA", "AON", "AZM", "CSK", "ECS", "GHC", "MGF", "MZM", "ROL", "SDD", "SDP", "SRG", "SVC", "TRL", "TMM", "VEB", "YUN", "ZWD"],
            "MESSAGE": "Warning: [_1] [_2] is obsolete and no longer legal tender."
        }
    }
};