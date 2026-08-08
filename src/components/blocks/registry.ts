import ForgotPassword from './authentication/forgot-password'
import forgotPasswordCode from './authentication/forgot-password.tsx?raw'
import OtpValidate from './authentication/otp-validate'
import otpValidateCode from './authentication/otp-validate.tsx?raw'
import ResetPassword from './authentication/reset-password'
import resetPasswordCode from './authentication/reset-password.tsx?raw'
import SignIn from './authentication/sign-in'
import signInCode from './authentication/sign-in.tsx?raw'
import SignUp from './authentication/sign-up'
import signUpCode from './authentication/sign-up.tsx?raw'
import Default from './dashboard/default'
import defaultCode from './dashboard/default.tsx?raw'
import type { BlockDefinition } from './types'

export const blocks: BlockDefinition[] = [
	{
		category: 'authentication',
		code: signInCode,
		component: SignIn,
		description:
			'Sign in card with email and password. Switch between Simple and Social variants via the radio group.',
		fullPage: true,
		id: 'sign-in',
		name: 'Sign In',
	},
	{
		category: 'authentication',
		code: signUpCode,
		component: SignUp,
		description:
			'Sign up card with name, email and password. Switch between Simple, Default, Social and Split Panel variants via the radio group.',
		fullPage: true,
		id: 'sign-up',
		name: 'Sign Up',
	},
	{
		category: 'authentication',
		code: forgotPasswordCode,
		component: ForgotPassword,
		description: 'Forgot password card with email field and reset link action',
		fullPage: true,
		id: 'forgot-password',
		name: 'Forgot Password',
	},
	{
		category: 'authentication',
		code: otpValidateCode,
		component: OtpValidate,
		description: 'OTP code validation card for password reset flow',
		fullPage: true,
		id: 'otp-validate',
		name: 'OTP Validate',
	},
	{
		category: 'authentication',
		code: resetPasswordCode,
		component: ResetPassword,
		description:
			'Reset password card with new password and confirm password fields',
		fullPage: true,
		id: 'reset-password',
		name: 'Reset Password',
	},
	{
		category: 'dashboard',
		code: defaultCode,
		component: Default,
		description:
			'Full dashboard layout with collapsible sidebar, header, footer, and scrollable main content area.',
		id: 'default',
		name: 'Default',
	},
]
