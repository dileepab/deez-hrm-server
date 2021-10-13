import {
  AuthorizationContext,
  AuthorizationMetadata,
  AuthorizationDecision,
} from '@loopback/authorization';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import _ from 'lodash';
import {UserProfile, securityId} from '@loopback/security';

interface MyAuthorizationMetadata extends AuthorizationMetadata {
  currentUser?: UserProfile;
  decision?: AuthorizationDecision;
}

// Instance level authorizer
// Can be also registered as an authorizer, depends on users' need.
export async function jwtAuthorization(
  authorizationCtx: AuthorizationContext,
  metadata: MyAuthorizationMetadata,
) {
  // No access if authorization details are missing
  let currentUser: UserProfile;
  if (authorizationCtx.principals.length > 0) {
    const user = _.pick(authorizationCtx.principals[0], [
      'id',
      'name',
      'roles',
    ]);
    currentUser = {[securityId]: user.id, name: user.name, roles: user.roles};
  } else {
    return AuthorizationDecision.DENY;
  }

  if (!currentUser.roles) {
    return AuthorizationDecision.DENY;
  }

  // Authorize everything that does not have a allowedRoles property
  if (!metadata.allowedRoles) {
    return AuthorizationDecision.ALLOW;
  }

  let roleIsAllowed = false;
  for (const role of currentUser.roles) {
    if (metadata.allowedRoles!.includes(role)) {
      roleIsAllowed = true;
      break;
    }
  }

  if (!roleIsAllowed) {
    return AuthorizationDecision.DENY;
  }

  if (roleIsAllowed) {
    return AuthorizationDecision.ALLOW;
  }

  // Admin and support accounts bypass id verification
  if (
    currentUser.roles.includes('admin')
  ) {
    return AuthorizationDecision.ALLOW;
  }

  // Allow access only to model owners
  if (currentUser[securityId] === authorizationCtx.invocationContext.args[0]) {
    return AuthorizationDecision.ALLOW;
  }

  return AuthorizationDecision.DENY;
}