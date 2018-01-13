# Backend API

## Game document

    {
        _id: 'uuid',
        startTime: 0,
        endTime: 0,
        client: 'name',
        character: '',
        xp: 123,
        gold: 999,
        killer: ''
    }

## Register game

    POST /games/

Returns game JSON including \_id

## List games

    GET /games/

## Unregister game

    DELETE /games/123

## Update stats

    PATCH /games/123
    or
    PUT /games/123/stats

## Update scoreboard

    PATCH /games/123
    or
    PUT /games/123/scores
