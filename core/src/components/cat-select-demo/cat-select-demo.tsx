import { Component, h, Host } from '@stencil/core';
import { of, delay } from 'rxjs';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  desc: string;
}

interface Country {
  id: string;
  country: string;
  capital?: string;
}
@Component({
  tag: 'cat-select-demo',
  shadow: true
})
export class CatSelectTest {
  private multipleSelect?: HTMLCatSelectElement;
  private multipleSelectAvatar?: HTMLCatSelectElement;
  private multipleSelectTagging?: HTMLCatSelectElement;
  private singleSelect?: HTMLCatSelectElement;
  private singleSelectAvatar?: HTMLCatSelectElement;
  private singleSelectTagging?: HTMLCatSelectElement;

  componentDidLoad(): void {
    this.multipleSelect?.connect({
      resolve: (ids: string[]) => {
        console.info(`Resolving data... (${ids.join(', ')})`);
        return of(
          ids.map(id => ({
            id,
            firstName: 'John',
            lastName: `Doe (${id})`,
            desc: 'resolved'
          }))
        ).pipe(delay(500));
      },
      retrieve: (term: string, page: number) => {
        console.info(`Retrieving data... ("${term}", ${page})`);
        return term === 'no'
          ? of({ last: true, content: [], totalElements: 0 })
          : of({
              last: false,
              totalElements: 10000,
              content: Array.from({ length: 10 }, (_, i) => ({
                id: '' + (i + page * 10),
                firstName: 'John',
                lastName: `Doe (${i + page * 10})`,
                desc: `"${term}": page ${page}`
              }))
            }).pipe(delay(500));
      },
      render: (user: User) => ({
        label: `${user.firstName} ${user.lastName}`,
        description: user.desc
      })
    });
    this.multipleSelectAvatar?.connect({
      resolve: (ids: string[]) => {
        console.info(`Resolving data... (${ids.join(', ')})`);
        return of(
          ids.map(id => ({
            id,
            firstName: 'John',
            lastName: `Doe (${id})`,
            desc: 'resolved'
          }))
        ).pipe(delay(500));
      },
      retrieve: (term: string, page: number) => {
        console.info(`Retrieving data... ("${term}", ${page})`);
        return term === 'no'
          ? of({ last: true, content: [], totalElements: 0 })
          : of({
              last: false,
              totalElements: 10000,
              content: Array.from({ length: 10 }, (_, i) => ({
                id: '' + (i + page * 10),
                firstName: 'John',
                lastName: `Doe (${i + page * 10})`,
                desc: `"${term}": page ${page}`
              }))
            }).pipe(delay(500));
      },
      render: (user: User) => ({
        label: `${user.firstName} ${user.lastName}`,
        description: user.desc,
        avatar: {
          src: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200`,
          round: true
        }
      })
    });
    this.multipleSelectTagging?.connect(this.countryConnector);
    this.singleSelect?.connect({
      resolve: (ids: string[]) => {
        console.info(`Resolving data... (${ids.join(', ')})`);
        return of(
          ids.map(id => ({
            id,
            firstName: 'John',
            lastName: `Doe (${id})`,
            desc: 'resolved'
          }))
        ).pipe(delay(500));
      },
      retrieve: (term: string, page: number) => {
        console.info(`Retrieving data... ("${term}", ${page})`);
        return term === 'no'
          ? of({ last: true, content: [], totalElements: 0 })
          : of({
              last: false,
              totalElements: 10000,
              content: Array.from({ length: 10 }, (_, i) => ({
                id: '' + (i + page * 10),
                firstName: 'John',
                lastName: `Doe (${i + page * 10})`,
                desc: `"${term}": page ${page}`
              }))
            }).pipe(delay(500));
      },
      render: (user: User) => ({
        label: `${user.firstName} ${user.lastName}`,
        description: user.desc
      })
    });
    this.singleSelectAvatar?.connect(this.countryConnector);
    this.singleSelectTagging?.connect(this.countryConnector);
    setTimeout(() => {
      this.multipleSelect!.value = [];
    }, 5000);
  }

  render() {
    return (
      <Host style={{ display: 'flex', flexDirection: 'column' }}>
        <cat-select
          label="Multiple Select"
          hint="This is a hint!"
          ref={el => (this.multipleSelect = el)}
          value={['1']}
          placeholder="Hello World"
          onCatChange={() => console.log(this.multipleSelect?.value)}
          onCatBlur={e => console.log('Multiple blur', e)}
          multiple
          clearable
        >
          <span slot="hint">Searching for "no" -{'>'} no options are returned!</span>
        </cat-select>
        <cat-select
          label="Multiple with img"
          ref={el => (this.multipleSelectAvatar = el)}
          value={['1']}
          placeholder="Hello World"
          multiple
          clearable
        ></cat-select>
        <cat-select
          label="Multiple with tagging support"
          hint="This is a hint!"
          ref={el => (this.multipleSelectTagging = el)}
          value={{ ids: ['1'], tags: ['Test', 'Albania', 'Algeria'] }}
          placeholder="Select country"
          onCatChange={() => console.log(this.multipleSelectTagging?.value)}
          multiple
          tags
          clearable
        ></cat-select>
        <cat-select
          label="Single Select"
          hint="This is a hint!"
          ref={el => (this.singleSelect = el)}
          placeholder="Search for a country or capital"
          onCatBlur={e => console.log('Single blur', e)}
          clearable
        ></cat-select>
        <cat-select
          label="Single with img"
          ref={el => (this.singleSelectAvatar = el)}
          value={'1'}
          onCatChange={() => console.log(this.singleSelectAvatar?.value)}
          placeholder="Search for a country or capital"
          clearable
        ></cat-select>
        <cat-dropdown overflow noAutoClose>
          <cat-button slot="trigger" style={{ width: '50%' }}>
            Open select
          </cat-button>
          <div slot="content" style={{ width: '400px' }}>
            <cat-select
              label="Single with tagging support"
              ref={el => (this.singleSelectTagging = el)}
              value={{ id: '', tag: 'Albania' }}
              placeholder="Search for a country or capital"
              onCatChange={() => console.log('Single', this.singleSelectTagging?.value)}
              tagHint="new country"
              tags
              clearable
              style={{ width: '90%' }}
            ></cat-select>
          </div>
        </cat-dropdown>
      </Host>
    );
  }

  private get countryConnector() {
    return {
      resolve: (ids: string[]) => {
        console.info(`Resolving data... (${ids.join(', ')})`);
        return of(ids.map(id => countries.find(value => value.id === id))).pipe(delay(500));
      },
      retrieve: (term: string, page: number) => {
        console.info(`Retrieving data... ("${term}", ${page})`);
        const filter = countries.filter(
          value =>
            value.country.toLowerCase().indexOf(term.toLowerCase()) === 0 ||
            value.capital?.toLowerCase().indexOf(term.toLowerCase()) === 0
        );
        const slice = filter.slice(page * 10, page * 10 + 10);
        return of({
          last: slice.length < 10,
          totalElements: filter.length,
          content: slice
        }).pipe(delay(500));
      },
      render: (country: Country) => ({
        label: country.country,
        description: country.capital || 'No capital',
        avatar: {
          src: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200`,
          round: true
        }
      })
    };
  }
}

const countries: Country[] = [
  {
    id: '0',
    country:
      'Afghanistan Extra extra large extra large extra large extra large extra large extra large extra large extra large extra large extra large extra large extra large extra large extra large ',
    capital: 'Kabul'
  },
  {
    id: '1',
    country: 'Albania',
    capital: 'Tirana'
  },
  {
    id: '2',
    country: 'Algeria',
    capital: 'Alger'
  },
  {
    id: '3',
    country: 'American Samoa',
    capital: 'Fagatogo'
  },
  {
    id: '4',
    country: 'Andorra',
    capital: 'Andorra la Vella'
  },
  {
    id: '5',
    country: 'Angola',
    capital: 'Luanda'
  },
  {
    id: '6',
    country: 'Anguilla',
    capital: 'The Valley'
  },
  {
    id: '7',
    country: 'Antarctica'
  },
  {
    id: '8',
    country: 'Antigua and Barbuda',
    capital: "Saint John's"
  },
  {
    id: '9',
    country: 'Argentina',
    capital: 'Buenos Aires'
  },
  {
    id: '10',
    country: 'Armenia',
    capital: 'Yerevan'
  },
  {
    id: '11',
    country: 'Aruba',
    capital: 'Oranjestad'
  },
  {
    id: '12',
    country: 'Australia',
    capital: 'Canberra'
  },
  {
    id: '13',
    country: 'Austria',
    capital: 'Wien'
  },
  {
    id: '14',
    country: 'Azerbaijan',
    capital: 'Baku'
  },
  {
    id: '15',
    country: 'Bahamas',
    capital: 'Nassau'
  },
  {
    id: '16',
    country: 'Bahrain',
    capital: 'al-Manama'
  },
  {
    id: '17',
    country: 'Bangladesh',
    capital: 'Dhaka'
  },
  {
    id: '18',
    country: 'Barbados',
    capital: 'Bridgetown'
  },
  {
    id: '19',
    country: 'Belarus',
    capital: 'Minsk'
  },
  {
    id: '20',
    country: 'Belgium',
    capital: 'Bruxelles [Brussel]'
  },
  {
    id: '21',
    country: 'Belize',
    capital: 'Belmopan'
  },
  {
    id: '22',
    country: 'Benin',
    capital: 'Porto-Novo'
  },
  {
    id: '23',
    country: 'Bermuda',
    capital: 'Hamilton'
  },
  {
    id: '24',
    country: 'Bhutan',
    capital: 'Thimphu'
  },
  {
    id: '25',
    country: 'Bolivia',
    capital: 'La Paz'
  },
  {
    id: '26',
    country: 'Bosnia and Herzegovina',
    capital: 'Sarajevo'
  },
  {
    id: '27',
    country: 'Botswana',
    capital: 'Gaborone'
  },
  {
    id: '28',
    country: 'Bouvet Island'
  },
  {
    id: '29',
    country: 'Brazil',
    capital: 'Brasília'
  },
  {
    id: '30',
    country: 'British Indian Ocean Territory'
  },
  {
    id: '31',
    country: 'Brunei',
    capital: 'Bandar Seri Begawan'
  },
  {
    id: '32',
    country: 'Bulgaria',
    capital: 'Sofia'
  },
  {
    id: '33',
    country: 'Burkina Faso',
    capital: 'Ouagadougou'
  },
  {
    id: '34',
    country: 'Burundi',
    capital: 'Bujumbura'
  },
  {
    id: '35',
    country: 'Cambodia',
    capital: 'Phnom Penh'
  },
  {
    id: '36',
    country: 'Cameroon',
    capital: 'Yaound'
  },
  {
    id: '37',
    country: 'Canada',
    capital: 'Ottawa'
  },
  {
    id: '38',
    country: 'Cape Verde',
    capital: 'Praia'
  },
  {
    id: '39',
    country: 'Cayman Islands',
    capital: 'George Town'
  },
  {
    id: '40',
    country: 'Central African Republic',
    capital: 'Bangui'
  },
  {
    id: '41',
    country: 'Chad',
    capital: "N'Djam"
  },
  {
    id: '42',
    country: 'Chile',
    capital: 'Santiago de Chile'
  },
  {
    id: '43',
    country: 'China',
    capital: 'Peking'
  },
  {
    id: '44',
    country: 'Christmas Island',
    capital: 'Flying Fish Cove'
  },
  {
    id: '45',
    country: 'Cocos (Keeling) Islands',
    capital: 'West Island'
  },
  {
    id: '46',
    country: 'Colombia',
    capital: 'Santaf'
  },
  {
    id: '47',
    country: 'Comoros',
    capital: 'Moroni'
  },
  {
    id: '48',
    country: 'Congo',
    capital: 'Brazzaville'
  },
  {
    id: '49',
    country: 'Cook Islands',
    capital: 'Avarua'
  },
  {
    id: '50',
    country: 'Costa Rica',
    capital: 'San José'
  },
  {
    id: '51',
    country: 'Croatia',
    capital: 'Zagreb'
  },
  {
    id: '52',
    country: 'Cuba',
    capital: 'La Habana'
  },
  {
    id: '53',
    country: 'Cyprus',
    capital: 'Nicosia'
  },
  {
    id: '54',
    country: 'Czech Republic',
    capital: 'Praha'
  },
  {
    id: '55',
    country: 'Denmark',
    capital: 'Copenhagen'
  },
  {
    id: '56',
    country: 'Djibouti',
    capital: 'Djibouti'
  },
  {
    id: '57',
    country: 'Dominica',
    capital: 'Roseau'
  },
  {
    id: '58',
    country: 'Dominican Republic',
    capital: 'Santo Domingo de Guzm'
  },
  {
    id: '59',
    country: 'East Timor',
    capital: 'Dili'
  },
  {
    id: '60',
    country: 'Ecuador',
    capital: 'Quito'
  },
  {
    id: '61',
    country: 'Egypt',
    capital: 'Cairo'
  },
  {
    id: '62',
    country: 'El Salvador',
    capital: 'San Salvador'
  },
  {
    id: '63',
    country: 'England',
    capital: 'London'
  },
  {
    id: '64',
    country: 'Equatorial Guinea',
    capital: 'Malabo'
  },
  {
    id: '65',
    country: 'Eritrea',
    capital: 'Asmara'
  },
  {
    id: '66',
    country: 'Estonia',
    capital: 'Tallinn'
  },
  {
    id: '67',
    country: 'Ethiopia',
    capital: 'Addis Abeba'
  },
  {
    id: '68',
    country: 'Falkland Islands',
    capital: 'Stanley'
  },
  {
    id: '69',
    country: 'Faroe Islands',
    capital: 'Tórshavn'
  },
  {
    id: '70',
    country: 'Fiji Islands',
    capital: 'Suva'
  },
  {
    id: '71',
    country: 'Finland',
    capital: 'Helsinki [Helsingfors]'
  },
  {
    id: '72',
    country: 'France',
    capital: 'Paris'
  },
  {
    id: '73',
    country: 'French Guiana',
    capital: 'Cayenne'
  },
  {
    id: '74',
    country: 'French Polynesia',
    capital: 'Papeete'
  },
  {
    id: '75',
    country: 'French Southern territories'
  },
  {
    id: '76',
    country: 'Gabon',
    capital: 'Libreville'
  },
  {
    id: '77',
    country: 'Gambia',
    capital: 'Banjul'
  },
  {
    id: '78',
    country: 'Georgia',
    capital: 'Tbilisi'
  },
  {
    id: '79',
    country: 'Germany',
    capital: 'Berlin'
  },
  {
    id: '80',
    country: 'Ghana',
    capital: 'Accra'
  },
  {
    id: '81',
    country: 'Gibraltar',
    capital: 'Gibraltar'
  },
  {
    id: '82',
    country: 'Greece',
    capital: 'Athenai'
  },
  {
    id: '83',
    country: 'Greenland',
    capital: 'Nuuk'
  },
  {
    id: '84',
    country: 'Grenada',
    capital: "Saint George's"
  },
  {
    id: '85',
    country: 'Guadeloupe',
    capital: 'Basse-Terre'
  },
  {
    id: '86',
    country: 'Guam',
    capital: 'Aga'
  },
  {
    id: '87',
    country: 'Guatemala',
    capital: 'Ciudad de Guatemala'
  },
  {
    id: '88',
    country: 'Guinea',
    capital: 'Conakry'
  },
  {
    id: '89',
    country: 'Guinea-Bissau',
    capital: 'Bissau'
  },
  {
    id: '90',
    country: 'Guyana',
    capital: 'Georgetown'
  },
  {
    id: '91',
    country: 'Haiti',
    capital: 'Port-au-Prince'
  },
  {
    id: '92',
    country: 'Heard Island and McDonald Islands'
  },
  {
    id: '93',
    country: 'Holy See (Vatican City State)',
    capital: 'Citt'
  },
  {
    id: '94',
    country: 'Honduras',
    capital: 'Tegucigalpa'
  },
  {
    id: '95',
    country: 'Hong Kong',
    capital: 'Victoria'
  },
  {
    id: '96',
    country: 'Hungary',
    capital: 'Budapest'
  },
  {
    id: '97',
    country: 'Iceland',
    capital: 'Reykjavík'
  },
  {
    id: '98',
    country: 'India',
    capital: 'New Delhi'
  },
  {
    id: '99',
    country: 'Indonesia',
    capital: 'Jakarta'
  },
  {
    id: '100',
    country: 'Iran',
    capital: 'Tehran'
  },
  {
    id: '101',
    country: 'Iraq',
    capital: 'Baghdad'
  },
  {
    id: '102',
    country: 'Ireland',
    capital: 'Dublin'
  },
  {
    id: '103',
    country: 'Israel',
    capital: 'Jerusalem'
  },
  {
    id: '104',
    country: 'Italy',
    capital: 'Roma'
  },
  {
    id: '105',
    country: 'Ivory Coast',
    capital: 'Yamoussoukro'
  },
  {
    id: '106',
    country: 'Jamaica',
    capital: 'Kingston'
  },
  {
    id: '107',
    country: 'Japan',
    capital: 'Tokyo'
  },
  {
    id: '108',
    country: 'Jordan',
    capital: 'Amman'
  },
  {
    id: '109',
    country: 'Kazakhstan',
    capital: 'Astana'
  },
  {
    id: '110',
    country: 'Kenya',
    capital: 'Nairobi'
  },
  {
    id: '111',
    country: 'Kiribati',
    capital: 'Bairiki'
  },
  {
    id: '112',
    country: 'Kuwait',
    capital: 'Kuwait'
  },
  {
    id: '113',
    country: 'Kyrgyzstan',
    capital: 'Bishkek'
  },
  {
    id: '114',
    country: 'Laos',
    capital: 'Vientiane'
  },
  {
    id: '115',
    country: 'Latvia',
    capital: 'Riga'
  },
  {
    id: '116',
    country: 'Lebanon',
    capital: 'Beirut'
  },
  {
    id: '117',
    country: 'Lesotho',
    capital: 'Maseru'
  },
  {
    id: '118',
    country: 'Liberia',
    capital: 'Monrovia'
  },
  {
    id: '119',
    country: 'Libyan Arab Jamahiriya',
    capital: 'Tripoli'
  },
  {
    id: '120',
    country: 'Liechtenstein',
    capital: 'Vaduz'
  },
  {
    id: '121',
    country: 'Lithuania',
    capital: 'Vilnius'
  },
  {
    id: '122',
    country: 'Luxembourg',
    capital: 'Luxembourg [Luxemburg/L'
  },
  {
    id: '123',
    country: 'Macao',
    capital: 'Macao'
  },
  {
    id: '124',
    country: 'North Macedonia',
    capital: 'Skopje'
  },
  {
    id: '125',
    country: 'Madagascar',
    capital: 'Antananarivo'
  },
  {
    id: '126',
    country: 'Malawi',
    capital: 'Lilongwe'
  },
  {
    id: '127',
    country: 'Malaysia',
    capital: 'Kuala Lumpur'
  },
  {
    id: '128',
    country: 'Maldives',
    capital: 'Male'
  },
  {
    id: '129',
    country: 'Mali',
    capital: 'Bamako'
  },
  {
    id: '130',
    country: 'Malta',
    capital: 'Valletta'
  },
  {
    id: '131',
    country: 'Marshall Islands',
    capital: 'Dalap-Uliga-Darrit'
  },
  {
    id: '132',
    country: 'Martinique',
    capital: 'Fort-de-France'
  },
  {
    id: '133',
    country: 'Mauritania',
    capital: 'Nouakchott'
  },
  {
    id: '134',
    country: 'Mauritius',
    capital: 'Port-Louis'
  },
  {
    id: '135',
    country: 'Mayotte',
    capital: 'Mamoutzou'
  },
  {
    id: '136',
    country: 'Mexico',
    capital: 'Ciudad de M'
  },
  {
    id: '137',
    country: 'Micronesia, Federated States of',
    capital: 'Palikir'
  },
  {
    id: '138',
    country: 'Moldova',
    capital: 'Chisinau'
  },
  {
    id: '139',
    country: 'Monaco',
    capital: 'Monaco-Ville'
  },
  {
    id: '140',
    country: 'Mongolia',
    capital: 'Ulan Bator'
  },
  {
    id: '141',
    country: 'Montenegro',
    capital: 'Podgorica'
  },
  {
    id: '142',
    country: 'Montserrat',
    capital: 'Plymouth'
  },
  {
    id: '143',
    country: 'Morocco',
    capital: 'Rabat'
  },
  {
    id: '144',
    country: 'Mozambique',
    capital: 'Maputo'
  },
  {
    id: '145',
    country: 'Myanmar',
    capital: 'Rangoon (Yangon)'
  },
  {
    id: '146',
    country: 'Namibia',
    capital: 'Windhoek'
  },
  {
    id: '147',
    country: 'Nauru',
    capital: 'Yaren'
  },
  {
    id: '148',
    country: 'Nepal',
    capital: 'Kathmandu'
  },
  {
    id: '149',
    country: 'Netherlands',
    capital: 'Amsterdam'
  },
  {
    id: '150',
    country: 'Netherlands Antilles',
    capital: 'Willemstad'
  },
  {
    id: '151',
    country: 'New Caledonia',
    capital: 'Noum'
  },
  {
    id: '152',
    country: 'New Zealand',
    capital: 'Wellington'
  },
  {
    id: '153',
    country: 'Nicaragua',
    capital: 'Managua'
  },
  {
    id: '154',
    country: 'Niger',
    capital: 'Niamey'
  },
  {
    id: '155',
    country: 'Nigeria',
    capital: 'Abuja'
  },
  {
    id: '156',
    country: 'Niue',
    capital: 'Alofi'
  },
  {
    id: '157',
    country: 'Norfolk Island',
    capital: 'Kingston'
  },
  {
    id: '158',
    country: 'North Korea',
    capital: 'Pyongyang'
  },
  {
    id: '159',
    country: 'Northern Ireland',
    capital: 'Belfast'
  },
  {
    id: '160',
    country: 'Northern Mariana Islands',
    capital: 'Garapan'
  },
  {
    id: '161',
    country: 'Norway',
    capital: 'Oslo'
  },
  {
    id: '162',
    country: 'Oman',
    capital: 'Masqat'
  },
  {
    id: '163',
    country: 'Pakistan',
    capital: 'Islamabad'
  },
  {
    id: '164',
    country: 'Palau',
    capital: 'Koror'
  },
  {
    id: '165',
    country: 'Palestine',
    capital: 'Gaza'
  },
  {
    id: '166',
    country: 'Panama',
    capital: 'Ciudad de Panamá'
  },
  {
    id: '167',
    country: 'Papua New Guinea',
    capital: 'Port Moresby'
  },
  {
    id: '168',
    country: 'Paraguay',
    capital: 'Asunción'
  },
  {
    id: '169',
    country: 'Peru',
    capital: 'Lima'
  },
  {
    id: '170',
    country: 'Philippines',
    capital: 'Manila'
  },
  {
    id: '171',
    country: 'Pitcairn',
    capital: 'Adamstown'
  },
  {
    id: '172',
    country: 'Poland',
    capital: 'Warszawa'
  },
  {
    id: '173',
    country: 'Portugal',
    capital: 'Lisboa'
  },
  {
    id: '174',
    country: 'Puerto Rico',
    capital: 'San Juan'
  },
  {
    id: '175',
    country: 'Qatar',
    capital: 'Doha'
  },
  {
    id: '176',
    country: 'Reunion',
    capital: 'Saint-Denis'
  },
  {
    id: '177',
    country: 'Romania',
    capital: 'Bucuresti'
  },
  {
    id: '178',
    country: 'Russian Federation',
    capital: 'Moscow'
  },
  {
    id: '179',
    country: 'Rwanda',
    capital: 'Kigali'
  },
  {
    id: '180',
    country: 'Saint Helena',
    capital: 'Jamestown'
  },
  {
    id: '181',
    country: 'Saint Kitts and Nevis',
    capital: 'Basseterre'
  },
  {
    id: '182',
    country: 'Saint Lucia',
    capital: 'Castries'
  },
  {
    id: '183',
    country: 'Saint Pierre and Miquelon',
    capital: 'Saint-Pierre'
  },
  {
    id: '184',
    country: 'Saint Vincent and the Grenadines',
    capital: 'Kingstown'
  },
  {
    id: '185',
    country: 'Samoa',
    capital: 'Apia'
  },
  {
    id: '186',
    country: 'San Marino',
    capital: 'San Marino'
  },
  {
    id: '187',
    country: 'Sao Tome and Principe',
    capital: 'São Tomé'
  },
  {
    id: '188',
    country: 'Saudi Arabia',
    capital: 'Riyadh'
  },
  {
    id: '189',
    country: 'Scotland',
    capital: 'Edinburgh'
  },
  {
    id: '190',
    country: 'Senegal',
    capital: 'Dakar'
  },
  {
    id: '191',
    country: 'Serbia',
    capital: 'Belgrade'
  },
  {
    id: '192',
    country: 'Seychelles',
    capital: 'Victoria'
  },
  {
    id: '193',
    country: 'Sierra Leone',
    capital: 'Freetown'
  },
  {
    id: '194',
    country: 'Singapore',
    capital: 'Singapore'
  },
  {
    id: '195',
    country: 'Slovakia',
    capital: 'Bratislava'
  },
  {
    id: '196',
    country: 'Slovenia',
    capital: 'Ljubljana'
  },
  {
    id: '197',
    country: 'Solomon Islands',
    capital: 'Honiara'
  },
  {
    id: '198',
    country: 'Somalia',
    capital: 'Mogadishu'
  },
  {
    id: '199',
    country: 'South Africa',
    capital: 'Pretoria'
  },
  {
    id: '200',
    country: 'South Georgia and the South Sandwich Islands'
  },
  {
    id: '201',
    country: 'South Korea',
    capital: 'Seoul'
  },
  {
    id: '202',
    country: 'South Sudan',
    capital: 'Juba'
  },
  {
    id: '203',
    country: 'Spain',
    capital: 'Madrid'
  },
  {
    id: '204',
    country: 'Sri Lanka',
    capital: 'Colombo, Sri Jayawardenepura Kotte'
  },
  {
    id: '205',
    country: 'Sudan',
    capital: 'Khartum'
  },
  {
    id: '206',
    country: 'Suriname',
    capital: 'Paramaribo'
  },
  {
    id: '207',
    country: 'Svalbard and Jan Mayen',
    capital: 'Longyearbyen'
  },
  {
    id: '208',
    country: 'Swaziland',
    capital: 'Mbabane'
  },
  {
    id: '209',
    country: 'Sweden',
    capital: 'Stockholm'
  },
  {
    id: '210',
    country: 'Switzerland',
    capital: 'Bern'
  },
  {
    id: '211',
    country: 'Syria',
    capital: 'Damascus'
  },
  {
    id: '212',
    country: 'Tajikistan',
    capital: 'Dushanbe'
  },
  {
    id: '213',
    country: 'Tanzania',
    capital: 'Dodoma'
  },
  {
    id: '214',
    country: 'Thailand',
    capital: 'Bangkok'
  },
  {
    id: '215',
    country: 'The Democratic Republic of Congo',
    capital: 'Kinshasa'
  },
  {
    id: '216',
    country: 'Togo',
    capital: 'Lomé'
  },
  {
    id: '217',
    country: 'Tokelau',
    capital: 'Fakaofo'
  },
  {
    id: '218',
    country: 'Tonga',
    capital: "Nuku'alofa"
  },
  {
    id: '219',
    country: 'Trinidad and Tobago',
    capital: 'Port-of-Spain'
  },
  {
    id: '220',
    country: 'Tunisia',
    capital: 'Tunis'
  },
  {
    id: '221',
    country: 'Turkey',
    capital: 'Ankara'
  },
  {
    id: '222',
    country: 'Turkmenistan',
    capital: 'Ashgabat'
  },
  {
    id: '223',
    country: 'Turks and Caicos Islands',
    capital: 'Cockburn Town'
  },
  {
    id: '224',
    country: 'Tuvalu',
    capital: 'Funafuti'
  },
  {
    id: '225',
    country: 'Uganda',
    capital: 'Kampala'
  },
  {
    id: '226',
    country: 'Ukraine',
    capital: 'Kyiv'
  },
  {
    id: '227',
    country: 'United Arab Emirates',
    capital: 'Abu Dhabi'
  },
  {
    id: '228',
    country: 'United Kingdom',
    capital: 'London'
  },
  {
    id: '229',
    country: 'United States',
    capital: 'Washington'
  },
  {
    id: '230',
    country: 'United States Minor Outlying Islands'
  },
  {
    id: '231',
    country: 'Uruguay',
    capital: 'Montevideo'
  },
  {
    id: '232',
    country: 'Uzbekistan',
    capital: 'Toskent'
  },
  {
    id: '233',
    country: 'Vanuatu',
    capital: 'Port-Vila'
  },
  {
    id: '234',
    country: 'Venezuela',
    capital: 'Caracas'
  },
  {
    id: '235',
    country: 'Vietnam',
    capital: 'Hanoi'
  },
  {
    id: '236',
    country: 'Virgin Islands, British',
    capital: 'Road Town'
  },
  {
    id: '237',
    country: 'Virgin Islands, U.S.',
    capital: 'Charlotte Amalie'
  },
  {
    id: '238',
    country: 'Wales',
    capital: 'Cardiff'
  },
  {
    id: '239',
    country: 'Wallis and Futuna',
    capital: 'Mata-Utu'
  },
  {
    id: '240',
    country: 'Western Sahara',
    capital: 'El-Aai'
  },
  {
    id: '241',
    country: 'Yemen',
    capital: 'Sanaa'
  },
  {
    id: '242',
    country: 'Zambia',
    capital: 'Lusaka'
  },
  {
    id: '243',
    country: 'Zimbabwe',
    capital: 'Harare'
  }
];
