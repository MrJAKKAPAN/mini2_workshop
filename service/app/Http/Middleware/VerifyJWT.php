<?php

namespace App\Http\Middleware;

use Closure;

class VerifyJWT
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::toUser($request->header('Authorization'));
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expried'], $e->getStatusCode());
        } catch (TokenInvalidException $e) { 
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return response()->json(['error'], 'Token is required');
        }
         return $next($request);
    }
}
