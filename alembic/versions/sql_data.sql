TRUNCATE TABLE flight_crew, flight, in_flight_employee, aircraft, route, airport RESTART IDENTITY CASCADE;

INSERT INTO airport (airport_code, airport_name, airport_country, airport_city, airport_address, longitude, latitude) VALUES
('JFK', 'John F. Kennedy International Airport', 'USA', 'New York', 'Queens, NY 11430', '-73.7781', '40.6413'),
('LAX', 'Los Angeles International Airport', 'USA', 'Los Angeles', '1 World Way, Los Angeles, CA 90045', '-118.4085', '33.9416'),
('ORD', 'O''Hare International Airport', 'USA', 'Chicago', '10000 W O''Hare Ave, Chicago, IL 60666', '-87.9073', '41.9742'),
('ATL', 'Hartsfield-Jackson Atlanta International Airport', 'USA', 'Atlanta', '6000 N Terminal Pkwy, Atlanta, GA 30320', '-84.4277', '33.6407'),
('DFW', 'Dallas/Fort Worth International Airport', 'USA', 'Dallas', '2400 Aviation Dr, DFW Airport, TX 75261', '-97.0403', '32.8998'),
('SEA', 'Seattle-Tacoma International Airport', 'USA', 'Seattle', '17801 International Blvd, Seattle, WA 98158', '-122.3088', '47.4502'),
('MIA', 'Miami International Airport', 'USA', 'Miami', '2100 NW 42nd Ave, Miami, FL 33142', '-80.2906', '25.7959'),
('DEN', 'Denver International Airport', 'USA', 'Denver', '8500 Peña Blvd, Denver, CO 80249', '-104.6737', '39.8561'),
('BOS', 'Boston Logan International Airport', 'USA', 'Boston', '1 Harborside Dr, Boston, MA 02128', '-71.0052', '42.3656'),
('SFO', 'San Francisco International Airport', 'USA', 'San Francisco', 'San Francisco, CA 94128', '-122.3790', '37.6213'),
('PHX', 'Phoenix Sky Harbor International Airport', 'USA', 'Phoenix', '3400 E Sky Harbor Blvd, Phoenix, AZ 85034', '-112.0116', '33.4342');

INSERT INTO aircraft (aircraft_id, manufacturer, aircraft_model, current_distance, maintenance_interval, aircraft_status, aircraft_location) VALUES
('11111111-1111-1111-1111-111111111111', 'Boeing', '737-800', 12000, 15000, 'AVAILABLE', 'JFK'),
('22222222-2222-2222-2222-222222222222', 'Airbus', 'A320', 18000, 20000, 'DEPLOYED', 'LAX'),
('33333333-3333-3333-3333-333333333333', 'Boeing', '787-9', 5000, 12000, 'AVAILABLE', 'ORD'),
('44444444-4444-4444-4444-444444444444', 'Embraer', 'E175', 21000, 25000, 'AOG', 'ATL'),
('55555555-5555-5555-5555-555555555555', 'Airbus', 'A321', 8000, 15000, 'AVAILABLE', 'DFW'),
('66666666-6666-6666-6666-666666666666', 'Airbus', 'A321', 8000, 15000, 'AVAILABLE', 'DFW'),
('77777777-7777-7777-7777-777777777777', 'Boeing', '737-900', 15500, 14000, 'AOG', 'SEA'),
('88888888-8888-8888-8888-888888888888', 'Airbus', 'A319', 9000, 16000, 'AVAILABLE', 'MIA'),
('99999999-9999-9999-9999-999999999999', 'Boeing', '777-300ER', 24000, 22000, 'AOG', 'DEN'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Airbus', 'A220-300', 3000, 10000, 'AVAILABLE', 'BOS'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Boeing', '757-200', 18500, 17000, 'AOG', 'SFO'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Airbus', 'A321neo', 4000, 15000, 'AVAILABLE', 'PHX');

INSERT INTO in_flight_employee (employee_id, first_name, last_name, position, employee_status, supervisor, employee_location) VALUES
('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Sarah', 'Johnson', 'CAPTAIN', 'AVAILABLE', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'JFK'),
('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'Michael', 'Smith', 'COPILOT', 'AVAILABLE', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'JFK'),
('aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'Emily', 'Davis', 'FLIGHT_MANAGER', 'AVAILABLE', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'JFK'),
('aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4', 'James', 'Brown', 'FLIGHT_ATTENDANT', 'AVAILABLE', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'JFK'),
('aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5', 'Olivia', 'Wilson', 'CAPTAIN', 'AVAILABLE', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5', 'ATL'),
('aaaaaaa6-aaaa-aaaa-aaaa-aaaaaaaaaaa6', 'Jake', 'Martinez', 'COPILOT', 'AVAILABLE', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5', 'ATL'),
('aaaaaaa7-aaaa-aaaa-aaaa-aaaaaaaaaaa7', 'Paul', 'Martinez', 'FLIGHT_MANAGER', 'AVAILABLE', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5', 'ATL'),
('aaaaaaa8-aaaa-aaaa-aaaa-aaaaaaaaaaa8', 'Logan', 'Martinez', 'FLIGHT_ATTENDANT', 'AVAILABLE', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5', 'ATL'),

('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'Avery', 'Nguyen', 'CAPTAIN', 'AVAILABLE', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'SEA'),
('bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2', 'Liam', 'Park', 'COPILOT', 'AVAILABLE', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'SEA'),
('bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbb3', 'Mia', 'Reed', 'FLIGHT_MANAGER', 'AVAILABLE', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'SEA'),
('bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbb4', 'Noah', 'Khan', 'FLIGHT_ATTENDANT', 'AVAILABLE', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'SEA'),

('ccccccc1-cccc-cccc-cccc-ccccccccccc1', 'Sofia', 'Diaz', 'CAPTAIN', 'AVAILABLE', 'ccccccc1-cccc-cccc-cccc-ccccccccccc1', 'MIA'),
('ccccccc2-cccc-cccc-cccc-ccccccccccc2', 'Ethan', 'Lopez', 'COPILOT', 'AVAILABLE', 'ccccccc1-cccc-cccc-cccc-ccccccccccc1', 'MIA'),
('ccccccc3-cccc-cccc-cccc-ccccccccccc3', 'Grace', 'Adams', 'FLIGHT_MANAGER', 'AVAILABLE', 'ccccccc1-cccc-cccc-cccc-ccccccccccc1', 'MIA'),
('ccccccc4-cccc-cccc-cccc-ccccccccccc4', 'Henry', 'Price', 'FLIGHT_ATTENDANT', 'AVAILABLE', 'ccccccc1-cccc-cccc-cccc-ccccccccccc1', 'MIA'),

('ddddddd1-dddd-dddd-dddd-ddddddddddd1', 'Chloe', 'Young', 'CAPTAIN', 'AVAILABLE', 'ddddddd1-dddd-dddd-dddd-ddddddddddd1', 'DEN'),
('ddddddd2-dddd-dddd-dddd-ddddddddddd2', 'Lucas', 'King', 'COPILOT', 'AVAILABLE', 'ddddddd1-dddd-dddd-dddd-ddddddddddd1', 'DEN'),
('ddddddd3-dddd-dddd-dddd-ddddddddddd3', 'Zoe', 'Scott', 'FLIGHT_MANAGER', 'AVAILABLE', 'ddddddd1-dddd-dddd-dddd-ddddddddddd1', 'DEN'),
('ddddddd4-dddd-dddd-dddd-ddddddddddd4', 'Mason', 'Cruz', 'FLIGHT_ATTENDANT', 'AVAILABLE', 'ddddddd1-dddd-dddd-dddd-ddddddddddd1', 'DEN'),

('eeeeeee1-eeee-eeee-eeee-eeeeeeeeeee1', 'Ella', 'Wright', 'CAPTAIN', 'AVAILABLE', 'eeeeeee1-eeee-eeee-eeee-eeeeeeeeeee1', 'BOS'),
('eeeeeee2-eeee-eeee-eeee-eeeeeeeeeee2', 'Logan', 'Turner', 'COPILOT', 'AVAILABLE', 'eeeeeee1-eeee-eeee-eeee-eeeeeeeeeee1', 'BOS'),
('eeeeeee3-eeee-eeee-eeee-eeeeeeeeeee3', 'Lily', 'Hill', 'FLIGHT_MANAGER', 'AVAILABLE', 'eeeeeee1-eeee-eeee-eeee-eeeeeeeeeee1', 'BOS'),
('eeeeeee4-eeee-eeee-eeee-eeeeeeeeeee4', 'Owen', 'Baker', 'FLIGHT_ATTENDANT', 'AVAILABLE', 'eeeeeee1-eeee-eeee-eeee-eeeeeeeeeee1', 'BOS');

INSERT INTO route (route_id, destination_airport_code, origin_airport_code) VALUES
('b1111111-1111-1111-1111-111111111111', 'LAX', 'JFK'),
('b2222222-2222-2222-2222-222222222222', 'ORD', 'LAX'),
('b3333333-3333-3333-3333-333333333333', 'ATL', 'ORD'),
('b4444444-4444-4444-4444-444444444444', 'DFW', 'ATL'),
('b5555555-5555-5555-5555-555555555555', 'JFK', 'DFW'),
('c1111111-1111-1111-1111-111111111111', 'SEA', 'JFK'),
('c2222222-2222-2222-2222-222222222222', 'MIA', 'SEA'),
('c3333333-3333-3333-3333-333333333333', 'DEN', 'MIA'),
('c4444444-4444-4444-4444-444444444444', 'BOS', 'DEN'),
('c5555555-5555-5555-5555-555555555555', 'SFO', 'BOS'),
('d1111111-1111-1111-1111-111111111111', 'PHX', 'SFO'),
('d2222222-2222-2222-2222-222222222222', 'ATL', 'PHX'),
('d3333333-3333-3333-3333-333333333333', 'ORD', 'SEA'),
('d4444444-4444-4444-4444-444444444444', 'DFW', 'MIA'),
('d5555555-5555-5555-5555-555555555555', 'LAX', 'DEN');

INSERT INTO flight (flight_id, route_id, flight_status, aircraft_id, arrival_time, departure_time) VALUES
('f1111111-1111-1111-1111-111111111111', 'b1111111-1111-1111-1111-111111111111', 'ARRIVED', '11111111-1111-1111-1111-111111111111', '2022-03-01 14:00:00', '2022-03-01 10:00:00'),
('f2222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', 'ARRIVED', '22222222-2222-2222-2222-222222222222', '2023-03-01 16:30:00', '2023-03-01 13:00:00'),
('f3333333-3333-3333-3333-333333333333', 'b3333333-3333-3333-3333-333333333333', 'SCHEDULED', '33333333-3333-3333-3333-333333333333', '2026-02-20 18:00:00', '2026-02-20 14:00:00'),
('f4444444-4444-4444-4444-444444444444', 'b4444444-4444-4444-4444-444444444444', 'DELAYED', '55555555-5555-5555-5555-555555555555', '2026-02-21 11:30:00', '2026-02-21 07:45:00'),
('f5555555-5555-5555-5555-555555555555', 'b5555555-5555-5555-5555-555555555555', 'CANCELLED', '66666666-6666-6666-6666-666666666666', '2026-02-22 16:15:00', '2026-02-22 12:10:00'),
('f6666666-6666-6666-6666-666666666666', 'c1111111-1111-1111-1111-111111111111', 'IN_FLIGHT', '77777777-7777-7777-7777-777777777777', '2026-02-19 20:00:00', '2026-02-19 14:00:00'),
('f7777777-7777-7777-7777-777777777777', 'c2222222-2222-2222-2222-222222222222', 'ARRIVED', '88888888-8888-8888-8888-888888888888', '2025-12-10 17:00:00', '2025-12-10 10:30:00'),
('f8888888-8888-8888-8888-888888888888', 'c3333333-3333-3333-3333-333333333333', 'SCHEDULED', '99999999-9999-9999-9999-999999999999', '2026-02-23 21:00:00', '2026-02-23 16:45:00'),
('f9999999-9999-9999-9999-999999999999', 'c4444444-4444-4444-4444-444444444444', 'DELAYED', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2026-02-24 09:50:00', '2026-02-24 05:20:00'),
('fa111111-1111-1111-1111-111111111111', 'c5555555-5555-5555-5555-555555555555', 'ARRIVED', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2024-11-03 13:15:00', '2024-11-03 08:05:00'),
('fb222222-2222-2222-2222-222222222222', 'd1111111-1111-1111-1111-111111111111', 'IN_FLIGHT', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '2026-02-18 19:45:00', '2026-02-18 16:30:00'),
('fc333333-3333-3333-3333-333333333333', 'd2222222-2222-2222-2222-222222222222', 'SCHEDULED', '11111111-1111-1111-1111-111111111111', '2026-02-25 23:00:00', '2026-02-25 19:00:00'),
('fd444444-4444-4444-4444-444444444444', 'd3333333-3333-3333-3333-333333333333', 'ARRIVED', '33333333-3333-3333-3333-333333333333', '2025-08-01 15:20:00', '2025-08-01 11:00:00'),
('fe555555-5555-5555-5555-555555555555', 'd4444444-4444-4444-4444-444444444444', 'DELAYED', '88888888-8888-8888-8888-888888888888', '2026-02-26 10:10:00', '2026-02-26 06:40:00'),
('ff666666-6666-6666-6666-666666666666', 'd5555555-5555-5555-5555-555555555555', 'CANCELLED', '99999999-9999-9999-9999-999999999999', '2026-02-27 12:00:00', '2026-02-27 08:00:00');

INSERT INTO flight_crew (flight_id, employee_id) VALUES
('f1111111-1111-1111-1111-111111111111', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1'),
('f1111111-1111-1111-1111-111111111111', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2'),
('f1111111-1111-1111-1111-111111111111', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3'),
('f1111111-1111-1111-1111-111111111111', 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4'),

('f2222222-2222-2222-2222-222222222222', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5'),
('f2222222-2222-2222-2222-222222222222', 'aaaaaaa6-aaaa-aaaa-aaaa-aaaaaaaaaaa6'),
('f2222222-2222-2222-2222-222222222222', 'aaaaaaa7-aaaa-aaaa-aaaa-aaaaaaaaaaa7'),
('f2222222-2222-2222-2222-222222222222', 'aaaaaaa8-aaaa-aaaa-aaaa-aaaaaaaaaaa8'),

('f3333333-3333-3333-3333-333333333333', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5'),
('f3333333-3333-3333-3333-333333333333', 'aaaaaaa6-aaaa-aaaa-aaaa-aaaaaaaaaaa6'),
('f3333333-3333-3333-3333-333333333333', 'aaaaaaa7-aaaa-aaaa-aaaa-aaaaaaaaaaa7'),
('f3333333-3333-3333-3333-333333333333', 'aaaaaaa8-aaaa-aaaa-aaaa-aaaaaaaaaaa8'),

('f4444444-4444-4444-4444-444444444444', 'aaaaaaa5-aaaa-aaaa-aaaa-aaaaaaaaaaa5'),
('f4444444-4444-4444-4444-444444444444', 'aaaaaaa6-aaaa-aaaa-aaaa-aaaaaaaaaaa6'),
('f4444444-4444-4444-4444-444444444444', 'aaaaaaa7-aaaa-aaaa-aaaa-aaaaaaaaaaa7'),
('f4444444-4444-4444-4444-444444444444', 'aaaaaaa8-aaaa-aaaa-aaaa-aaaaaaaaaaa8'),

('f5555555-5555-5555-5555-555555555555', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1'),
('f5555555-5555-5555-5555-555555555555', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2'),
('f5555555-5555-5555-5555-555555555555', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3'),
('f5555555-5555-5555-5555-555555555555', 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4'),

('f6666666-6666-6666-6666-666666666666', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1'),
('f6666666-6666-6666-6666-666666666666', 'bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2'),
('f6666666-6666-6666-6666-666666666666', 'bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbb3'),
('f6666666-6666-6666-6666-666666666666', 'bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbb4'),

('f7777777-7777-7777-7777-777777777777', 'ccccccc1-cccc-cccc-cccc-ccccccccccc1'),
('f7777777-7777-7777-7777-777777777777', 'ccccccc2-cccc-cccc-cccc-ccccccccccc2'),
('f7777777-7777-7777-7777-777777777777', 'ccccccc3-cccc-cccc-cccc-ccccccccccc3'),
('f7777777-7777-7777-7777-777777777777', 'ccccccc4-cccc-cccc-cccc-ccccccccccc4'),

('f8888888-8888-8888-8888-888888888888', 'ccccccc1-cccc-cccc-cccc-ccccccccccc1'),
('f8888888-8888-8888-8888-888888888888', 'ccccccc2-cccc-cccc-cccc-ccccccccccc2'),
('f8888888-8888-8888-8888-888888888888', 'ccccccc3-cccc-cccc-cccc-ccccccccccc3'),
('f8888888-8888-8888-8888-888888888888', 'ccccccc4-cccc-cccc-cccc-ccccccccccc4'),

('f9999999-9999-9999-9999-999999999999', 'ddddddd1-dddd-dddd-dddd-ddddddddddd1'),
('f9999999-9999-9999-9999-999999999999', 'ddddddd2-dddd-dddd-dddd-ddddddddddd2'),
('f9999999-9999-9999-9999-999999999999', 'ddddddd3-dddd-dddd-dddd-ddddddddddd3'),
('f9999999-9999-9999-9999-999999999999', 'ddddddd4-dddd-dddd-dddd-ddddddddddd4'),

('fa111111-1111-1111-1111-111111111111', 'eeeeeee1-eeee-eeee-eeee-eeeeeeeeeee1'),
('fa111111-1111-1111-1111-111111111111', 'eeeeeee2-eeee-eeee-eeee-eeeeeeeeeee2'),
('fa111111-1111-1111-1111-111111111111', 'eeeeeee3-eeee-eeee-eeee-eeeeeeeeeee3'),
('fa111111-1111-1111-1111-111111111111', 'eeeeeee4-eeee-eeee-eeee-eeeeeeeeeee4'),

('fb222222-2222-2222-2222-222222222222', 'eeeeeee1-eeee-eeee-eeee-eeeeeeeeeee1'),
('fb222222-2222-2222-2222-222222222222', 'eeeeeee2-eeee-eeee-eeee-eeeeeeeeeee2'),
('fb222222-2222-2222-2222-222222222222', 'eeeeeee3-eeee-eeee-eeee-eeeeeeeeeee3'),
('fb222222-2222-2222-2222-222222222222', 'eeeeeee4-eeee-eeee-eeee-eeeeeeeeeee4'),

('fc333333-3333-3333-3333-333333333333', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1'),
('fc333333-3333-3333-3333-333333333333', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2'),
('fc333333-3333-3333-3333-333333333333', 'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3'),
('fc333333-3333-3333-3333-333333333333', 'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4'),

('fd444444-4444-4444-4444-444444444444', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1'),
('fd444444-4444-4444-4444-444444444444', 'bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2'),
('fd444444-4444-4444-4444-444444444444', 'bbbbbbb3-bbbb-bbbb-bbbb-bbbbbbbbbbb3'),
('fd444444-4444-4444-4444-444444444444', 'bbbbbbb4-bbbb-bbbb-bbbb-bbbbbbbbbbb4'),

('fe555555-5555-5555-5555-555555555555', 'ccccccc1-cccc-cccc-cccc-ccccccccccc1'),
('fe555555-5555-5555-5555-555555555555', 'ccccccc2-cccc-cccc-cccc-ccccccccccc2'),
('fe555555-5555-5555-5555-555555555555', 'ccccccc3-cccc-cccc-cccc-ccccccccccc3'),
('fe555555-5555-5555-5555-555555555555', 'ccccccc4-cccc-cccc-cccc-ccccccccccc4'),

('ff666666-6666-6666-6666-666666666666', 'ddddddd1-dddd-dddd-dddd-ddddddddddd1'),
('ff666666-6666-6666-6666-666666666666', 'ddddddd2-dddd-dddd-dddd-ddddddddddd2'),
('ff666666-6666-6666-6666-666666666666', 'ddddddd3-dddd-dddd-dddd-ddddddddddd3'),
('ff666666-6666-6666-6666-666666666666', 'ddddddd4-dddd-dddd-dddd-ddddddddddd4');
