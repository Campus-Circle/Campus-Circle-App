let table = [
  [
    ['Company', 'CTC(in Lakhs)', 'No. of Offers'],
    ['Unthinkable', '6', ''],
    ['TCS ninja', '3.3', '9'],
    ['TCS digital', '7', '19'],
    ['Josh Tech', '9', '5'],
    ['ZS', '12.8', '5'],
    ['Exl', '6', '25'],
    ['Infoedge', '12.5', '6'],
    ['Public Sapenit', '10', '10'],
    ['Cognizant', '4', ''],
    ['IBM', '4.5', '27'],
    ['Wipro', '3.7', '40'],
    ['Delhivery', '8', ''],
    ['Incedo', '5.5', ''],
    ['BigOnotation', '5.5', ''],
    ['PureSoftware', '8', ''],
    ['L&amp;T', '6', '3'],
    ['OCCL', '6', ''],
    ['Dalberg', '10', ''],
    ['Digit genral Insurance', '9', ''],
    ['Zia Semiconductor', '8', '4'],
    ['Tata Electronics', '6', ''],
    ['Dixon Technologies', '6', ''],
    ['Think Future Tech', '5', '1'],
    ['Decimal Techs', '5', ''],
    ['Nayak softwares', '6', ''],
    ['Impetus', '6', ''],
    ['Hexaveue', '6', ''],
    ['Edwisor', '6.6', ''],
    ['Accenture', '9.9', ''],
    ['Lead Routes', 'N/A', ''],
    ['SVI(AEC) Cambodia', '600$/month', ''],
    ['Optum', '13.5', ''],
    ['BITCS', '8', ''],
    ['Clarivate Analytics', '6.5', ''],
    ['Synoriq', '6', ''],
    ['Dhwani Rural Systems', '6', ''],
    ['Scalar Academy', '8.5-9.5', ''],
    ['Polestar Solutions', '6', ''],
    ['Samsung', '14', '42'],
    ['Mobikwik', '14.5', ''],
    ['Digit General Insurance', '7', '3'],
    ['Pure Software', '6+2', '9'],
    ['Decimal Technologies', '4.5/5', '5'],
    ['rtCamp', '12-18', ''],
    ['Calyxpod', '3', ''],
    ['Sopra Steria', '5', ''],
    ['Nuclei', '6', ''],
    ['Veneklasen Associates', '5.4', ''],
    ['BYJU&#39;s', '6', ''],
    ['Acxiom', '4.8', ''],
    ['Orgzit', '8', ''],
    ['Amazon', '44', '7 (CSE - 5, ECE - 2)']
  ]
];

table = table[0].slice(1);

// console.log(table[0]);

const columns = [
  {
    name: 'S no.',
    accessor: 'id'
  },
  {
    name: 'Company',
    accessor: 'Company',
    disableSortBy: true
  },
  {
    name: 'CTC(in Lakhs)',
    accessor: 'ctc'
  },
  {
    name: 'No. of Offers',
    accessor: 'offers'
  }
];

const data = table.map((item, index) => {
  return {
    id: index + 1,
    Company: item[0],
    ctc: parseFloat(item[1]),
    offers: parseFloat(item[2]) == NaN ? 'N/A' : parseFloat(item[2])
  };
});

console.log(data);
