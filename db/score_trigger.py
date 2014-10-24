#!/usr/bin/env python

print '''
    create or replace function on_score_update() returns trigger as $$
    declare
        new_home_score integer := 0;
        new_away_score integer := 0;
        old_home_score integer := 0;
        old_away_score integer := 0;
    begin
        if new.home_score is not null then
            new_home_score := new.home_score;
        end if;
        if new.away_score is not null then
            new_away_score := new.away_score;
        end if;
        if old.home_score is not null then
            old_home_score := old.home_score;
        end if;
        if old.away_score is not null then
            old_away_score := old.away_score;
        end if;
        if new_home_score <> old_home_score or new_away_score <> old_away_score then
            perform pg_notify('score_update', cast(new.game_id as text) || ', ' || cast(new_home_score as text) || ', ' || cast(new_away_score as text));
        end if;
        return new;
    end;
    $$ language plpgsql;
'''

print '''
    drop trigger if exists score_trigger on games;
    create trigger score_trigger after update on games for each row execute procedure on_score_update();
'''