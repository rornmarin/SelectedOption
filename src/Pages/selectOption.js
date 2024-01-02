import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "../components/select";
import './style.css'

const SelectOption = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const [result, setResult] = useState(false);

  const fetchProvinceData = async () => {
    try {
      const response = await axios.get('https://api.staging.goldenqueenhospital.com/v1/pumi');
      const fetchedProvinces = response.data.data;
      setProvinces(fetchedProvinces);
    } catch (error) {
      console.error('Error fetching province data:', error);
    }
  };

  const fetchDistrictData = async (provinceId) => {
    try {
      const response = await axios.get(`https://api.staging.goldenqueenhospital.com/v1/pumi/districts?parent_id=${provinceId}`);
      const fetchedDistricts = response.data.data;
      setDistricts(fetchedDistricts);
    } catch (error) {
      console.error('Error fetching district data:', error);
    }
  };

  const fetchCommunesData = async (districtId) => {
    try {
      const response = await axios.get(`https://api.staging.goldenqueenhospital.com/v1/pumi/communes?parent_id=${districtId}`);
      const fetchedCommunes = response.data.data;
      setCommunes(fetchedCommunes);
    } catch (error) {
      console.error('Error fetching commune data:', error);
    }
  };

  const fetchVillagesData = async (communeId) => {
    try {
      const response = await axios.get(`https://api.staging.goldenqueenhospital.com/v1/pumi/villages?parent_id=${communeId}`);
      const fetchedVillages = response.data.data;
      setVillages(fetchedVillages);
    } catch (error) {
      console.error('Error fetching village data:', error);
    }
  };

  useEffect(() => {
    fetchProvinceData();
  }, []);

  const handleProvinceSelect = (provinceId) => {
    fetchDistrictData(provinceId);
    setSelectedProvince(provinces.find(pro => pro.id === parseInt(provinceId)));
    setSelectedDistrict('');
    setSelectedCommune('');
    setSelectedVillage('');
    setDistricts([]);
    setCommunes([]);
    setVillages([]);
  };

  const handleDistrictSelect = (districtId) => {
    setSelectedDistrict(districts.find(dis => dis.id === parseInt(districtId)));
    fetchCommunesData(districtId);
    setSelectedCommune('');
    setSelectedVillage('');
    setCommunes([]);
    setVillages([]);
  };

  const handleCommuneSelect = (communeId) => {
    setSelectedCommune(communes.find(commune => commune.id === parseInt(communeId)));
    fetchVillagesData(communeId);
    setSelectedVillage('');
    setVillages([]);
  };

  const handleVillageSelect = (villageId) => {
    setSelectedVillage(villages.find(village => village.id === parseInt(villageId)));
    // fetchVillagesData(villageId);
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
      
    })

    setProvinces(provinces)

    setResult(false)
  };

  const handleSubmit = () => {
     
    setResult(true)

    setResult({
      province:selectedProvince,
      district:selectedDistrict,
      communes:selectedCommune,
      village:selectedVillage
    })

    setProvinces([])

  };

  return (
    <div>
      <h2>Province</h2>

      <Select data={provinces} onSelect={handleProvinceSelect} selectOption={'Select province'}></Select>

      <h2>District</h2>

      <Select data={districts} onSelect={handleDistrictSelect} selectOption={'Select district'}></Select>

      <h2>Communes</h2>

      <Select data={communes} onSelect={handleCommuneSelect} selectOption={'Select commune'}/>

      <h2>Villages</h2>

      <Select data={villages} onSelect={handleVillageSelect} selectOption={'Select villages'} />

      <button type="button" onClick={handleClear}>Clear</button>
      <button type="button"  onClick={handleSubmit}>Submit</button>
      <div>
        {
          result 
          
          ?

          <div>
            <h3>Your seleted</h3>
            <p>Province: {selectedProvince.name}</p>
            <p>district: {selectedDistrict.name}</p>
            <p>commune: {selectedCommune.name}</p>
            <p>village: {selectedVillage.name}</p>
          </div> 

          : 

          ''
        }
      </div>
    </div>

    
  );
};

export default SelectOption;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const SelectOption = () => {
//   const [provinces, setProvinces] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [communes, setCommunes] = useState([]);
//   const [villages, setVillages] = useState([]);

//   const [selectedProvince, setSelectedProvince] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [selectedCommune, setSelectedCommune] = useState('');
//   const [selectedVillage, setSelectedVillage] = useState('');

//   const [result, setResult] = useState(false);

//   const fetchProvinceData = async () => {
//     try {
//       const response = await axios.get('https://api.staging.goldenqueenhospital.com/v1/pumi');
//       const fetchedProvinces = response.data.data;
//       setProvinces(fetchedProvinces);
//     } catch (error) {
//       console.error('Error fetching province data:', error);
//     }
//   };

//   const fetchDistrictData = async (provinceId) => {
//     try {
//       const response = await axios.get(`https://api.staging.goldenqueenhospital.com/v1/pumi/districts?parent_id=${provinceId}`);
//       const fetchedDistricts = response.data.data;
//       setDistricts(fetchedDistricts);
//     } catch (error) {
//       console.error('Error fetching district data:', error);
//     }
//   };

//   const fetchCommunesData = async (districtId) => {
//     try {
//       const response = await axios.get(`https://api.staging.goldenqueenhospital.com/v1/pumi/communes?parent_id=${districtId}`);
//       const fetchedCommunes = response.data.data;
//       setCommunes(fetchedCommunes);
//     } catch (error) {
//       console.error('Error fetching commune data:', error);
//     }
//   };

//   const fetchVillagesData = async (communeId) => {
//     try {
//       const response = await axios.get(`https://api.staging.goldenqueenhospital.com/v1/pumi/villages?parent_id=${communeId}`);
//       const fetchedVillages = response.data.data;
//       setVillages(fetchedVillages);
//     } catch (error) {
//       console.error('Error fetching village data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProvinceData();
//   }, []);

//   const handleProvinceSelect = (provinceId) => {
//     fetchDistrictData(provinceId);
//     setSelectedProvince(provinces.find(pro => pro.id === parseInt(provinceId)));
//     setSelectedDistrict('');
//     setSelectedCommune('');
//     setSelectedVillage('');
//     setDistricts([]);
//     setCommunes([]);
//     setVillages([]);
//   };

//   const handleDistrictSelect = (districtId) => {
//     setSelectedDistrict(districts.find(dis => dis.id == parseInt(districtId)));
//     fetchCommunesData(districtId);
//     setSelectedCommune('');
//     setSelectedVillage('');
//     setCommunes([]);
//     setVillages([]);
//   };

//   const handleCommuneSelect = (communeId) => {
//     setSelectedCommune(communes.find(commune => commune.id == parseInt(communeId)));
//     fetchVillagesData(communeId);
//     setSelectedVillage('');
//     setVillages([]);
//   };

//   const handleVillageSelect = (villageId) => {
//     setSelectedVillage(villages.find(village => village.id == parseInt(villageId)));
//     // fetchVillagesData(villageId);
//   };


//   const handleClear = () => {
//     setSelectedProvince('');
//     setSelectedDistrict('');
//     setSelectedCommune('');
//     setSelectedVillage('');

//     setDistricts([]);
//     setCommunes([]);
//     setVillages([]);
//     setResult({
      
//     })
//   };

//   const handleSubmit = () => {
     
//     setResult(true)

//     setResult({
//       province:selectedProvince,
//       district:selectedDistrict,
//       communes:selectedCommune,
//       village:selectedVillage
//     })

//     setProvinces([])

//   };

//   return (
//     <div>
//       <h2>Province</h2>
//       <select onChange={(e) => handleProvinceSelect(e.target.value)} >
//         <option value="">Select a province</option>
//         {provinces.map((province) => (
//           <option key={province.id} value={province.id}>
//             {province.name} / {province.name_km}
//           </option>
//         ))}
//       </select>

//       <h2>District</h2>
//       <select onChange={(e) => handleDistrictSelect(e.target.value)} >
//         <option value="">Select a district</option>
//         {districts.map((district) => (
//           <option key={district.id} value={district.id}>
//             {district.name} / {district.name_km}
//           </option>
//         ))}
//       </select>

//       <h2>Communes</h2>
//       <select onChange={(e) => handleCommuneSelect(e.target.value)} >
//         <option value="">Select a commune</option>
//         {communes.map((commune) => (
//           <option key={commune.id} value={commune.id}>
//             {commune.name} / {commune.name_km}
//           </option>
//         ))}
//       </select>

//       <h2>Villages</h2>
//       <select onChange={(e) => handleVillageSelect(e.target.value)} >
//         <option value="">Select a village</option>
//         {villages.map((village) => (
//           <option key={village.id} value={village.id}>
//             {village.name} / {village.name_km}
//           </option>
//         ))}
//       </select>

//       <button type="button" onClick={handleClear}>Clear</button>
//       <button type="button"  onClick={handleSubmit}>Submit</button>
//       <div>
//         {
//           result 
          
//           ?

//           <div>
//             <h3>Your seleted</h3>
//             <p>Province: {selectedProvince.name}</p>
//             <p>district: {selectedDistrict.name}</p>
//             <p>commune: {selectedCommune.name}</p>
//             <p>village: {selectedVillage.name}</p>
//           </div> 

//           : 

//           ''
//         }
//       </div>
//     </div>

    
//   );
// };

// export default SelectOption;

