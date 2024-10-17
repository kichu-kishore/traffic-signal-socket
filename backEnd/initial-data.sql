INSERT INTO stations (id, name, code, area) VALUES (NEXTVAL('stations_id_seq'), 'S20', 'STA20', 'Karamadai');

INSERT INTO traffic_lights_category (id, name, code, has_special_aspects, special_aspects_code, has_semaphore, semaphore_code)
VALUES
    (NEXTVAL('traffic_lights_category_id_seq'), '4 Light', '4LI', false, '', false, ''),
    (NEXTVAL('traffic_lights_category_id_seq'), 'Normal', 'NOR', false, '', false, ''),
    (NEXTVAL('traffic_lights_category_id_seq'), 'C Special Aspect', 'CSA', true, 'C', false, ''),
    (NEXTVAL('traffic_lights_category_id_seq'), 'P Special Aspect', 'PSA', true, 'P', false, ''),
    (NEXTVAL('traffic_lights_category_id_seq'), 'Half Circle', 'HCE', false, '', false, ''),
    (NEXTVAL('traffic_lights_category_id_seq'), 'Normal With Half Circle', 'NWH', true, 'HC', false, ''),
    (NEXTVAL('traffic_lights_category_id_seq'), 'Semaphore with three hands', 'STH', false, '', true, 'TH'),
    (NEXTVAL('traffic_lights_category_id_seq'), 'Semaphore with single hand left', 'SSL', false, '', true, 'SH'),
    (NEXTVAL('traffic_lights_category_id_seq'), 'Semaphore with single hand right', 'SSR', false, '', true, 'SH');

INSERT INTO traffic_lights_color_category  (id, name, color_code, indication_name) 
    VALUES (NEXTVAL('traffic_lights_color_category_id_seq'), 'Red','#B81B0E', 'Stop'),
    (NEXTVAL('traffic_lights_color_category_id_seq'), 'Green' ,'#549C30', 'Go'),
    (NEXTVAL('traffic_lights_color_category_id_seq'), 'Amber' ,'#F7B500', 'Get ready'), 
    (NEXTVAL('traffic_lights_color_category_id_seq'), 'White' ,'#FFFFFF', 'Keep go');

INSERT INTO traffic_lights ( id, traffic_lights_category, stations)
    VALUES 
    (NEXTVAL('traffic_lights_id_seq'), 1, 1),
    (NEXTVAL('traffic_lights_id_seq'), 2, 1),
    (NEXTVAL('traffic_lights_id_seq'), 2, 1),
    (NEXTVAL('traffic_lights_id_seq'), 3, 1),
    (NEXTVAL('traffic_lights_id_seq'), 3, 1),
    (NEXTVAL('traffic_lights_id_seq'), 5, 1),
    (NEXTVAL('traffic_lights_id_seq'), 6, 1),
    (NEXTVAL('traffic_lights_id_seq'), 2, 1),
    (NEXTVAL('traffic_lights_id_seq'), 4, 1),
    (NEXTVAL('traffic_lights_id_seq'), 7, 1),
    (NEXTVAL('traffic_lights_id_seq'), 8, 1),
    (NEXTVAL('traffic_lights_id_seq'), 9, 1);

INSERT INTO traffic_light_colors (id, traffic_lights, traffic_lights_color_category)
    VALUES 
    (NEXTVAL('traffic_light_colors_id_seq'), 1, 1),
    (NEXTVAL('traffic_light_colors_id_seq'), 1, 2),
    (NEXTVAL('traffic_light_colors_id_seq'), 1, 3),
    (NEXTVAL('traffic_light_colors_id_seq'), 1, 4),
    (NEXTVAL('traffic_light_colors_id_seq'), 2, 1),
    (NEXTVAL('traffic_light_colors_id_seq'), 2, 2),
    (NEXTVAL('traffic_light_colors_id_seq'), 2, 3),
    (NEXTVAL('traffic_light_colors_id_seq'), 3, 2),
    (NEXTVAL('traffic_light_colors_id_seq'), 3, 3),
    (NEXTVAL('traffic_light_colors_id_seq'), 4, 1),
    (NEXTVAL('traffic_light_colors_id_seq'), 4, 2),
    (NEXTVAL('traffic_light_colors_id_seq'), 4, 3),
    (NEXTVAL('traffic_light_colors_id_seq'), 5, 1),
    (NEXTVAL('traffic_light_colors_id_seq'), 5, 2),
    (NEXTVAL('traffic_light_colors_id_seq'), 5, 3),
    (NEXTVAL('traffic_light_colors_id_seq'), 6, 1),
    (NEXTVAL('traffic_light_colors_id_seq'), 6, 2),
    (NEXTVAL('traffic_light_colors_id_seq'), 6, 3),
    (NEXTVAL('traffic_light_colors_id_seq'), 7, 1),
    (NEXTVAL('traffic_light_colors_id_seq'), 7, 2), 
    (NEXTVAL('traffic_light_colors_id_seq'), 8, 2),
    (NEXTVAL('traffic_light_colors_id_seq'), 9, 1),
    (NEXTVAL('traffic_light_colors_id_seq'), 9, 2),
    (NEXTVAL('traffic_light_colors_id_seq'), 9, 3),
    (NEXTVAL('traffic_light_colors_id_seq'), 10, 1),
    (NEXTVAL('traffic_light_colors_id_seq'), 10, 2),
    (NEXTVAL('traffic_light_colors_id_seq'), 11, 1),
    (NEXTVAL('traffic_light_colors_id_seq'), 11, 2),
    (NEXTVAL('traffic_light_colors_id_seq'), 12, 1),
    (NEXTVAL('traffic_light_colors_id_seq'), 12, 2);

INSERT INTO traffic_light_colors_special_aspects (id, traffic_lights, traffic_lights_color_category)
    VALUES 
    (NEXTVAL('traffic_light_colors_special_aspects_id_seq'), 4, 1),
    (NEXTVAL('traffic_light_colors_special_aspects_id_seq'), 5, 3),
    (NEXTVAL('traffic_light_colors_special_aspects_id_seq'), 7, 1),
    (NEXTVAL('traffic_light_colors_special_aspects_id_seq'), 7, 2),
    (NEXTVAL('traffic_light_colors_special_aspects_id_seq'), 7, 3),
    (NEXTVAL('traffic_light_colors_special_aspects_id_seq'), 9, 4);

INSERT INTO traffic_light_signal(id, traffic_lights,signal_date_and_time, signal_color, special_aspect_signal_color)
VALUES (NEXTVAL('traffic_light_signal_id_seq'), 1, NOW(), 1, 1);






    