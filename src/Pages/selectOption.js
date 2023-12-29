import React, { useState } from "react";
import provincesJson from './provinces.json';
import districtsjSON from './districts.json';
import communesJosn from './communes.json';
import villagesJson from './villages.json';
import './style.css'

const geoExtractor = (data) => {
  return Object.keys(data).map(key => {
    return {
      id: key,
      name: data[key].name 
    }
  })
}
// console.log(villagesJson);

const provinceData = geoExtractor(provincesJson.provinces, 'provinces')
const districtsData = geoExtractor(districtsjSON.districts, 'districts')
const communesData = geoExtractor(communesJosn.communes, 'communes')
const villagsData = geoExtractor(villagesJson.villages, 'villages')
// console.log(communesData);

const SelectOption = () => {

  const [provinces] = useState(provinceData);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const [result, setResult] = useState([]);


  const handleProvinceSelect = (provinceId) => {
    const province = provinces.find(obj => obj.id === provinceId)
    setSelectedProvince(province.name.latin);
    setSelectedDistrict('');
    setSelectedCommune('');
    setSelectedVillage('');
    setDistricts(districtsData.filter(district => district.id.startsWith(provinceId)))
    setCommunes([])
    setVillages([])
  };

  const handleDistrictSelect = (districtId) => {
    const district = districts.find(district => district.id === districtId)
    setSelectedDistrict(district.name.latin);
    setSelectedCommune('');
    setSelectedVillage('');
    setCommunes(communesData.filter(commune => commune.id.startsWith(districtId)))
    setVillages([])
  };


  const handleCommuneSelect = (communeId) => {
    const selectCommue = communes.find(commune => commune.id === communeId);
    setSelectedCommune(selectCommue.name.latin);
    setSelectedVillage(''); 
    setVillages(villagsData.filter(village => village.id.startsWith(communeId)))
  }

  const handleVillageSelect = (villageId) => {
    const selectVillage = villages.find(village => village.id === villageId);
    setSelectedVillage(selectVillage.name.latin)
  }

  const handleSubmit = () => {

    setResult({
      province:selectedProvince,
      district:selectedDistrict,
      commune:selectedCommune,
      village:selectedVillage,
    })
  };

  const handleClear = () => {
    setSelectedProvince('');
    setSelectedDistrict('');
    setSelectedCommune('');
    setSelectedVillage('');

    setDistricts([]);
    setCommunes([]);
    setVillages([]);
    setResult({
    //   province: '',
    // district: '',
    // commune: '',
    // village: '',
    });
    
  };


  return (
    <div>

      <h2>Province</h2>

      <select onChange={(e) => handleProvinceSelect(e.target.value)}>
          <option value="">Select a province</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.id}>
            {province.name.latin} / {province.name.km}
            </option>
          ))}
      </select>

      <h2>District</h2>

      <select onChange={(e) => handleDistrictSelect(e.target.value)}>
        <option value="">Select a district</option>
        {districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name.latin} / {district.name.km}
          </option>
        ))}
      </select>

      <h2>Commune</h2>

      <select onChange={(e) => handleCommuneSelect(e.target.value)}>
        <option value="">Select a Commune</option>
        {communes.map((commune) => (
          <option key={commune.id} value={commune.id}>
            {commune.name.latin} / {commune.name.km}
          </option>
        ))}
      </select>

      <h2>village</h2>

      <select onChange={(e) => handleVillageSelect(e.target.value)}>
        <option value="">Select a village</option>
        {villages.map((village) => (
          <option key={village.id} value={village.id}>
            {village.name.latin} / {village.name.km}
          </option>
        ))}
      </select>

      <div>
        <button type="button" onClick={handleSubmit}>Submit</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </div>

      <div>
        <h3>Your selected</h3>
        {result.province && <p>Province: {result.province}</p>}
        {result.district && <p>District: {result.district}</p>}
        {result.commune && <p>Commune: {result.commune}</p>}
        {result.village && <p>Village: {result.village}</p>}
      </div>

    </div>
  );
};

export default SelectOption;
