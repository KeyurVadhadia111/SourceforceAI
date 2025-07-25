import React, { useEffect, useRef, useState } from "react";
import { CompanyHeader } from "components/profile/CompanyHeader";
import { AIConfidenceScore } from "components/profile/AIConfidenceScore";
import { CompanySnapshot, CompanySnapshotData } from "components/profile/CompanySnapshot";
import { ShipmentTimeline } from "components/profile/ShipmentTimeline";
import { KeyTradePartners } from "components/profile/KeyTradePartners";
import { YearlyImportActivity } from "components/profile/YearlyImportActivity";
import { TopImportedProducts } from "components/profile/TopImportedProducts";
import { GlobalTradeRelationships } from "components/profile/GlobalTradeRelationships";
import { CountryWiseImport } from "components/profile/CountryWiseImport";
import { ShipmentVolumeSummary } from "components/profile/ShipmentVolumeSummary";
import { LatestShipments } from "components/profile/LatestShipments";
import { AlternateAddresses } from "components/profile/AlternateAddresses";
import { CompanyTags } from "components/profile/CompanyTags";
import { Button } from "components/utils/Button";
import Icon from "components/utils/Icon";
import { HtsMapping } from "components/profile/HtsMapping";

const companyData: CompanySnapshotData = {
  established: "2012",
  employees: "300+",
  phone: "(925) 890-7440",
  location: "343 E Lies Rd, Carol Stream, Il 60188, Us",
  totalSeaShipments: "570",
  avgTeuPerShipment: "2.02",
  avgTeuPerMonth: "6.75",
  estShippingSpend: "$719,340.3",
  mostRecentShipment: "06/10/2025",
  dbUpdated: "06/30/2025",
  locationMatches: "Carol Stream(nearest) > Township of Bloomingdale > DuPage County > Illinois"
};

export const SupplierProfile: React.FC = () => {

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [visibleSection, setVisibleSection] = useState<number | null>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = () => setSidebarVisible(true);
  const handleMouseLeave = () => setSidebarVisible(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const index = sectionRefs.current.findIndex((ref) => ref === visible.target);
          if (index !== -1) {
            setVisibleSection(sectionBar[index].id);
          }
        }
      },
      {
        root: null,
        threshold: 0.4,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref!);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    const section = sectionRefs.current[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  const sectionBar = [
    {
      id: 1,
      title: "Company Snapshot"
    },
    {
      id: 2,
      title: "Shipment Timeline: Sea Freight Volume Over Years"
    },
    {
      id: 3,
      title: "Key Trade Partners"
    },
    {
      id: 4,
      title: "Yearly Import Activity & Shipment Cadence"
    },
    {
      id: 5,
      title: "Top Imported Products by HS Code"
    },
    {
      id: 6,
      title: "HTS Mapping from Product Descriptions"
    },
    {
      id: 7,
      title: "Top 10 Global Trade Relationships"
    },
    {
      id: 8,
      title: "Country-Wise Import Volume Distribution"
    },
    {
      id: 9,
      title: "Shipment Volume Summary"
    },
    {
      id: 10,
      title: "Latest Sea Freight Shipment Records"
    },
    {
      id: 11,
      title: "Alternate Company Addresses & Contact Metadata"
    },
    {
      id: 12,
      title: "	Company Tags & Classification"
    }
  ]

  return (
    <div className="flex flex-col md:flex-row md:h-[calc(100vh-110px)] w-full">
      <div className="flex flex-col items-start w-full lg:min-[1025px]:w-[calc(100%-40px)] lg:min-[1025px]:h-[calc(100vh-0px)] md:overflow-y-auto">
        <CompanyHeader />
        {/* <div className="relative self-stretch w-full h-px bg-[#eeeeee]" /> */}
        <div className="flex flex-col items-start gap-4 md:gap-[30px] md:pl-6 md:pr-0 md:py-[30px] p-4 relative self-stretch w-full flex-[0_0_auto]">
          <div className="w-full" ref={(el: any) => (sectionRefs.current[-1] = el)}><AIConfidenceScore /></div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[0] = el)}><CompanySnapshot data={companyData} /></div>
          <div className="w-full flex justify-center sm:justify-start gap-4 relative">
            <div className="bg-[#529e7e] inline-flex h-[42px] items-center justify-center gap-3 px-6 py-2 sm:py-3.5 relative flex-[0_0_auto] rounded-[50px] overflow-hidden">
              <Icon icon="download" className="w-3.5 h-3.5 text-white" />
              <Button className="sm:text-base text-sm w-1/2 !font-medium">
                Download
              </Button>
            </div>
            <div className="border border-solid border-[#529e7e] inline-flex h-[42px] items-center justify-center gap-3 px-6 py-3.5 relative flex-[0_0_auto] rounded-[50px] overflow-hidden">
              <div className="relative w-6 h-6 mt-[-5.00px] mb-[-5.00px]">
                <Icon icon="export" className="w-6 h-6 text-primary" />
              </div>
              <div className="relative w-fit mt-[-5.00px] mb-[-3.00px] [font-family:'Satoshi',Helvetica] font-medium text-[#529e7e] text-base tracking-[0] leading-[22px] whitespace-nowrap">
                Share
              </div>
            </div>
          </div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[1] = el)}><ShipmentTimeline /></div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[2] = el)}><KeyTradePartners /></div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[3] = el)}><YearlyImportActivity /></div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[4] = el)}><TopImportedProducts /></div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[5] = el)}><HtsMapping /></div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[6] = el)}><GlobalTradeRelationships /></div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[7] = el)}><CountryWiseImport /></div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[8] = el)}><ShipmentVolumeSummary /></div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[9] = el)}><LatestShipments /></div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[10] = el)}><AlternateAddresses /></div>
          <div className="w-full" ref={(el: any) => (sectionRefs.current[11] = el)}><CompanyTags /></div>
          {/* <ShipmentTimeline />
          <KeyTradePartners />
          <YearlyImportActivity />
          <TopImportedProducts />
          <HtsMapping />
          <GlobalTradeRelationships />
          <CountryWiseImport />
          <ShipmentVolumeSummary />
          <LatestShipments />
          <AlternateAddresses />
          <CompanyTags /> */}
        </div>
        <div className="relative self-stretch w-full h-px bg-[#eeeeee]" />
        <div className="flex items-center justify-end gap-[223px] p-[30px] relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
            <div className="inline-flex items-center justify-center gap-2.5 px-6 py-2 sm:px-9 sm:py-3.5 relative flex-[0_0_auto] bg-[#529e7e] rounded-[50px] overflow-hidden">
              <div className="relative w-fit mt-[-1.50px] [font-family:'Satoshi',Helvetica] font-medium text-white text-xs sm:text-base tracking-[0] leading-[22px] whitespace-nowrap">
                Send RFQ
              </div>
            </div>
          </div>
        </div>
      </div>

      {!sidebarVisible && (
        <div
          className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 flex-col gap-2 pr-1  hidden lg:flex"
          onMouseEnter={handleMouseEnter}
        >
          {sectionBar.map((item, index) => (
            <div
              key={item.id}
              onClick={() => scrollToSection(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer rounded-full transition-all shadow-md ${visibleSection === item.id ? "bg-primary" : "bg-gray-400"}`}
              title={item.title}
            />
          ))}
        </div>
      )}

      {/* Sidebar */}
      <div
        onMouseLeave={handleMouseLeave}
        className={`hidden lg:block fixed top-0 right-0 h-full w-[424px] bg-white p-6 overflow-y-auto transition-transform duration-500 z-40 ${sidebarVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mt-[110px] flex flex-col gap-4">
          {sectionBar.map((item, index) => (
            <div
              key={item.id}
              onClick={() => scrollToSection(index)}
              className={`rounded-2xl p-4 border border-border text-text dark:text-textDark cursor-pointer transition ${visibleSection === item.id
                ? "bg-[#529e7e] text-white"
                : ""
                }`}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
