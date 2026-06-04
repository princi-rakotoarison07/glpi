# GLPI 11.0.7 - Ressources supprimables

## Helpdesk

| ItemType API     | Table SQL              | Endpoint API                  |
| ---------------- | ---------------------- | ----------------------------- |
| Ticket           | glpi_tickets           | /apirest.php/Ticket           |
| TicketTask       | glpi_tickettasks       | /apirest.php/TicketTask       |
| TicketValidation | glpi_ticketvalidations | /apirest.php/TicketValidation |
| ITILFollowup     | glpi_itilfollowups     | /apirest.php/ITILFollowup     |
| Solution         | glpi_itilsolutions     | /apirest.php/ITILSolution     |
| TicketRecurrent  | glpi_ticketrecurrents  | /apirest.php/TicketRecurrent  |

---

## Gestion des problèmes

| ItemType API | Table SQL         | Endpoint API             |
| ------------ | ----------------- | ------------------------ |
| Problem      | glpi_problems     | /apirest.php/Problem     |
| ProblemTask  | glpi_problemtasks | /apirest.php/ProblemTask |

---

## Gestion des changements

| ItemType API     | Table SQL              | Endpoint API                  |
| ---------------- | ---------------------- | ----------------------------- |
| Change           | glpi_changes           | /apirest.php/Change           |
| ChangeTask       | glpi_changetasks       | /apirest.php/ChangeTask       |
| ChangeValidation | glpi_changevalidations | /apirest.php/ChangeValidation |

---

## Parc Informatique

| ItemType API       | Table SQL                | Endpoint API                    |
| ------------------ | ------------------------ | ------------------------------- |
| Computer           | glpi_computers           | /apirest.php/Computer           |
| Monitor            | glpi_monitors            | /apirest.php/Monitor            |
| Printer            | glpi_printers            | /apirest.php/Printer            |
| Peripheral         | glpi_peripherals         | /apirest.php/Peripheral         |
| NetworkEquipment   | glpi_networkequipments   | /apirest.php/NetworkEquipment   |
| Phone              | glpi_phones              | /apirest.php/Phone              |
| Appliance          | glpi_appliances          | /apirest.php/Appliance          |
| Rack               | glpi_racks               | /apirest.php/Rack               |
| Enclosure          | glpi_enclosures          | /apirest.php/Enclosure          |
| PDU                | glpi_pdus                | /apirest.php/PDU                |
| PassiveDCEquipment | glpi_passivedcequipments | /apirest.php/PassiveDCEquipment |
| UnmanagedDevice    | glpi_unmanageddevices    | /apirest.php/UnmanagedDevice    |

---

## Réseau

| ItemType API | Table SQL         | Endpoint API             |
| ------------ | ----------------- | ------------------------ |
| NetworkPort  | glpi_networkports | /apirest.php/NetworkPort |
| IPAddress    | glpi_ipaddresses  | /apirest.php/IPAddress   |
| IPNetwork    | glpi_ipnetworks   | /apirest.php/IPNetwork   |
| NetworkName  | glpi_networknames | /apirest.php/NetworkName |

---

## Télécommunications

| ItemType API  | Table SQL           | Endpoint API               |
| ------------- | ------------------- | -------------------------- |
| Line          | glpi_lines          | /apirest.php/Line          |
| DeviceSimcard | glpi_devicesimcards | /apirest.php/DeviceSimcard |

---

## Logiciels

| ItemType API    | Table SQL             | Endpoint API                 |
| --------------- | --------------------- | ---------------------------- |
| Software        | glpi_softwares        | /apirest.php/Software        |
| SoftwareVersion | glpi_softwareversions | /apirest.php/SoftwareVersion |
| SoftwareLicense | glpi_softwarelicenses | /apirest.php/SoftwareLicense |

---

## Virtualisation

| ItemType API   | Table SQL            | Endpoint API                |
| -------------- | -------------------- | --------------------------- |
| VirtualMachine | glpi_virtualmachines | /apirest.php/VirtualMachine |
| Cluster        | glpi_clusters        | /apirest.php/Cluster        |

---

## Bases de données

| ItemType API     | Table SQL              | Endpoint API                  |
| ---------------- | ---------------------- | ----------------------------- |
| DatabaseInstance | glpi_databaseinstances | /apirest.php/DatabaseInstance |

---

## Certificats et domaines

| ItemType API | Table SQL         | Endpoint API             |
| ------------ | ----------------- | ------------------------ |
| Certificate  | glpi_certificates | /apirest.php/Certificate |
| Domain       | glpi_domains      | /apirest.php/Domain      |

---

## Contrats et finances

| ItemType API | Table SQL          | Endpoint API              |
| ------------ | ------------------ | ------------------------- |
| Contract     | glpi_contracts     | /apirest.php/Contract     |
| ContractCost | glpi_contractcosts | /apirest.php/ContractCost |
| Budget       | glpi_budgets       | /apirest.php/Budget       |
| Infocom      | glpi_infocoms      | /apirest.php/Infocom      |

---

## Fournisseurs et contacts

| ItemType API | Table SQL      | Endpoint API          |
| ------------ | -------------- | --------------------- |
| Supplier     | glpi_suppliers | /apirest.php/Supplier |
| Contact      | glpi_contacts  | /apirest.php/Contact  |

---

## Documents

| ItemType API | Table SQL      | Endpoint API          |
| ------------ | -------------- | --------------------- |
| Document     | glpi_documents | /apirest.php/Document |

---

## Consommables

| ItemType API   | Table SQL            | Endpoint API                |
| -------------- | -------------------- | --------------------------- |
| Consumable     | glpi_consumables     | /apirest.php/Consumable     |
| ConsumableItem | glpi_consumableitems | /apirest.php/ConsumableItem |

---

## Cartouches

| ItemType API  | Table SQL           | Endpoint API               |
| ------------- | ------------------- | -------------------------- |
| Cartridge     | glpi_cartridges     | /apirest.php/Cartridge     |
| CartridgeItem | glpi_cartridgeitems | /apirest.php/CartridgeItem |

---

## Réservations

| ItemType API    | Table SQL             | Endpoint API                 |
| --------------- | --------------------- | ---------------------------- |
| Reservation     | glpi_reservations     | /apirest.php/Reservation     |
| ReservationItem | glpi_reservationitems | /apirest.php/ReservationItem |

---

## Gestion de projet

| ItemType API | Table SQL         | Endpoint API             |
| ------------ | ----------------- | ------------------------ |
| Project      | glpi_projects     | /apirest.php/Project     |
| ProjectTask  | glpi_projecttasks | /apirest.php/ProjectTask |

---

## Base de connaissances

| ItemType API | Table SQL          | Endpoint API              |
| ------------ | ------------------ | ------------------------- |
| KnowbaseItem | glpi_knowbaseitems | /apirest.php/KnowbaseItem |

---

## Localisation

| ItemType API | Table SQL      | Endpoint API          |
| ------------ | -------------- | --------------------- |
| Location     | glpi_locations | /apirest.php/Location |

---

## Utilisateurs (optionnel)

| ItemType API | Table SQL   | Endpoint API       |
| ------------ | ----------- | ------------------ |
| User         | glpi_users  | /apirest.php/User  |
| Group        | glpi_groups | /apirest.php/Group |

EOF
