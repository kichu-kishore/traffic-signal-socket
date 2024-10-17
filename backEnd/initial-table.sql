-- Contain all the station details
-- for area may have reference but im only saving the string
CREATE TABLE IF NOT EXISTS stations (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name varchar(100),
    code varchar(5),
    area varchar(100)
);

-- Contains the basic of the traffic light categories like normal, semaphore
CREATE TABLE IF NOT EXISTS traffic_lights_category(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name varchar(100) NOT NULL,
    code varchar(100) NOT NULL,
    has_special_aspects boolean DEFAULT false,
    special_aspects_code varchar(10),
    has_semaphore boolean DEFAULT false,
    semaphore_code varchar(10),
   CONSTRAINT UNQ_TRAFFIC_LIGHT UNIQUE (code)
);

-- Contains the ccatgory of the traffic light colors like red green blue and
-- Reference to the traffic_light_colors
CREATE TABLE IF NOT EXISTS traffic_lights_color_category (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name varchar(30),
    color_code varchar(30),
    indication_name varchar(30)
);

--Contains the traffic light details
CREATE TABLE IF NOT EXISTS traffic_lights (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    traffic_lights_category BIGINT,
    stations BIGINT,
    CONSTRAINT FK_TRAFIC_LIGHT_CATEGORY FOREIGN KEY (traffic_lights_category) REFERENCES traffic_lights_category(id), 
    CONSTRAINT FK_STATION FOREIGN KEY (stations) REFERENCES stations(id) 
);

-- Contains the main colors like red, green, blue and so on... 
-- one to many relation
CREATE TABLE IF NOT EXISTS traffic_light_colors (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    traffic_lights BIGINT NOT NULL,
    traffic_lights_color_category BIGINT NOT NULL,
    CONSTRAINT FK_TRAFIC_LIGHT FOREIGN KEY (traffic_lights) REFERENCES traffic_lights(id), 
    CONSTRAINT FK_TRAFIC_LIGHT_COLOR FOREIGN KEY (traffic_lights_color_category) REFERENCES traffic_lights_color_category(id) 
);

-- Contains the special aspect colors like C and P 
-- one to many relation
CREATE TABLE IF NOT EXISTS traffic_light_colors_special_aspects (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    traffic_lights BIGINT NOT NULL,
    traffic_lights_color_category BIGINT NOT NULL,
    CONSTRAINT FK_TRAFIC_LIGHT_SPL FOREIGN KEY (traffic_lights) REFERENCES traffic_lights(id), 
    CONSTRAINT FK_TRAFIC_LIGHT_COLOR_SPL FOREIGN KEY (traffic_lights_color_category) REFERENCES traffic_lights_color_category(id)
);

-- The main signal table - live table
-- one to many relation
CREATE TABLE IF NOT EXISTS traffic_light_signal  (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    traffic_lights BIGINT NOT NULL,
    signal_date_and_time TIMESTAMP NOT NULL,
    signal_color BIGINT NULL, -- Can be nullable sometimes 
    special_aspect_signal_color BIGINT NULL, -- Can be nullable sometimes
    CONSTRAINT FK_TRAFIC_LIGHT_SIGNAL FOREIGN KEY (traffic_lights) REFERENCES traffic_lights(id), 
    CONSTRAINT FK_SIGNAL_COLOR_SIGNAL FOREIGN KEY (signal_color) REFERENCES traffic_light_colors(id), 
    CONSTRAINT FK_SIGNAL_COLOR_SIGNAL_SPL FOREIGN KEY (special_aspect_signal_color) REFERENCES traffic_light_colors_special_aspects(id) 
);

-- Create a function with for notify the signal changes
CREATE OR REPLACE FUNCTION notify_signal_change()
RETURNS trigger AS $$
DECLARE
  payload JSON; -- Declaration parts
BEGIN
  payload = json_build_object( -- json_build_object will help to build the json Data
    'signal_id', NEW.traffic_lights, --NEW will hold the newly inserted data
    'signal_data', row_to_json(NEW) 
  );
  PERFORM pg_notify('signal_data_change', payload::text);  -- This will notify the event listed of postgres
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Creating trigger will help to notify the server
CREATE TRIGGER signal_data_trigger
AFTER INSERT OR UPDATE ON traffic_light_signal
FOR EACH ROW EXECUTE FUNCTION notify_signal_change();