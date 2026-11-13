import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { Building2, Globe, MapPin, Phone } from 'lucide-react';
import { Language } from '../types/sem';

interface SemMapSectionProps {
  language: Language;
}

const SEM_HQ_LOCATION = { lat: 33.6827, lng: -7.3842 }; // 90 Quartier Industriel, Mohammedia

const REGIONAL_HUBS = [
  {
    id: 'hub-mohammedia',
    title: { fr: 'Siège Social & Centre d’Ingénierie', en: 'Headquarters & Engineering Center' },
    address: '90 Quartier Industriel, Mohammedia 20800, Maroc',
    position: { lat: 33.6827, lng: -7.3842 },
    phone: '+212 (0) 523 322 321',
  },
  {
    id: 'hub-casablanca',
    title: { fr: 'Pôle Projets & Partenaires', en: 'Projects & Partners Hub' },
    address: 'Boulevard Mohammed V, Casablanca, Maroc',
    position: { lat: 33.5731, lng: -7.5898 },
    phone: '+212 (0) 522 000 000',
  },
  {
    id: 'hub-rabat',
    title: { fr: 'Relations Administrations & Régulateurs', en: 'Public Admin & Regulatory Relations' },
    address: 'Avenue Mohammed VI, Rabat, Maroc',
    position: { lat: 34.0209, lng: -6.8416 },
    phone: '+212 (0) 537 000 000',
  },
];

export const SemMapSection: React.FC<SemMapSectionProps> = ({ language }) => {
  const isFr = language === 'fr';
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || '';
  const [activeHubId, setActiveHubId] = useState<string | null>('hub-mohammedia');
  const [selectedLocation, setSelectedLocation] = useState<typeof REGIONAL_HUBS[0] | null>(REGIONAL_HUBS[0]);

  return (
    <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors">
      <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-wide text-[#3769B3] dark:text-[#24A9E0] mb-1 uppercase">
            {isFr ? 'Implantation & Siège Social' : 'Headquarters & Regional Presence'}
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {isFr ? 'Carte interactive des agences SEM' : 'Interactive SEM Office Locator'}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {isFr
              ? 'Siège social basé à Mohammedia et couverture active dans 17 pays en Afrique.'
              : 'Headquartered in Mohammedia with active delivery operations across 17 African nations.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {REGIONAL_HUBS.map((hub) => (
            <button
              key={hub.id}
              type="button"
              onClick={() => {
                setActiveHubId(hub.id);
                setSelectedLocation(hub);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeHubId === hub.id
                  ? 'bg-[#3769B3] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {hub.title[isFr ? 'fr' : 'en']}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* Hub List Sidebar */}
        <div className="lg:col-span-4 p-6 bg-[#F8FAFC] dark:bg-[#0F1E33] border-r border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {isFr ? 'Nos Implantations' : 'Our Locations'}
          </h3>
          <div className="space-y-3">
            {REGIONAL_HUBS.map((hub) => {
              const isSelected = activeHubId === hub.id;
              return (
                <div
                  key={hub.id}
                  onClick={() => {
                    setActiveHubId(hub.id);
                    setSelectedLocation(hub);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-[#0B192C] border-[#3769B3] dark:border-[#24A9E0] shadow-sm'
                      : 'bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#3769B3]/10 dark:bg-[#24A9E0]/15 text-[#3769B3] dark:text-[#24A9E0] flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-display text-sm font-bold text-slate-900 dark:text-white truncate">
                        {hub.title[isFr ? 'fr' : 'en']}
                      </div>
                      <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{hub.address}</span>
                      </div>
                      <div className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 tabular-nums">
                        <Phone className="w-3.5 h-3.5 text-[#3769B3] dark:text-[#24A9E0] shrink-0" />
                        <span>{hub.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-[#3769B3]/10 dark:bg-[#24A9E0]/10 border border-[#3769B3]/20 dark:border-[#24A9E0]/20 text-xs text-slate-700 dark:text-slate-200 space-y-1.5">
            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#3769B3] dark:text-[#24A9E0]" />
              <span>{isFr ? 'Coopération Internationale' : 'International Delivery'}</span>
            </div>
            <p className="leading-relaxed">
              {isFr
                ? 'Interventions techniques et déploiements clés en main dans 17 pays d’Afrique subsaharienne et du Nord.'
                : 'Technical execution and turnkey deployments across 17 North and Sub-Saharan African nations.'}
            </p>
          </div>
        </div>

        {/* Google Map Canvas */}
        <div className="lg:col-span-8 relative min-h-[420px] bg-slate-100 dark:bg-slate-900">
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={SEM_HQ_LOCATION}
              defaultZoom={12}
              mapId="DEMO_MAP_ID"
              internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
              style={{ width: '100%', height: '100%' }}
            >
              {REGIONAL_HUBS.map((hub) => (
                <AdvancedMarker
                  key={hub.id}
                  position={hub.position}
                  onClick={() => {
                    setActiveHubId(hub.id);
                    setSelectedLocation(hub);
                  }}
                >
                  <Pin background="#3769B3" glyphColor="#FFFFFF" borderColor="#0B192C" />
                </AdvancedMarker>
              ))}

              {selectedLocation && (
                <InfoWindow
                  position={selectedLocation.position}
                  onCloseClick={() => setSelectedLocation(null)}
                >
                  <div className="p-2 space-y-1 text-slate-900 max-w-xs">
                    <div className="font-display font-bold text-sm">
                      {selectedLocation.title[isFr ? 'fr' : 'en']}
                    </div>
                    <div className="text-xs text-slate-600">{selectedLocation.address}</div>
                    <div className="text-xs font-mono font-medium text-[#3769B3]">{selectedLocation.phone}</div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};
